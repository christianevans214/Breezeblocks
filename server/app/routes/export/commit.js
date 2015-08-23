//set up the object with the api details
function GitHubCommit(api, owner, repo, ref)
{
  this.api = api;
  this.repo = {
    owner: owner,
    repo: repo,
    ref: ref
  }
}

GitHubCommit.prototype.commit = function(fileData, commitMessage, callback)
{
  /*
   fileData is an array of objects of format:
     {
       path: 'path/to/file/in/repo.ext',
       content: 'here is the file contents as a single string'
       [ -- optional information that will be defaulted to the following --
         mode: '100644',
         type: 'blob'
       ]
     }
   */
   //set defaults on the file data
   fileData = this._cleanFileData(fileData);
   
   //step 1 - cut a hole in the box
   //and by that i mean get the latest commit information
   this.api.git.refs.info(
     this.repo.owner, 
     this.repo.repo, 
     this.repo.ref, 
     this._initialRefsResponse(fileData, commitMessage, callback)
   );
}

GitHubCommit.prototype._initialRefsResponse = function(fileData, commitMessage, callback)
{
  //the response handler from step 1
  return function(err, data){
    //handle any errors sanely
    if(err){
      callback(err);
      return;
    }
    
    //step 1.5 - keep cutting the hole smooth like
    //and by that i mean get the tree information
    this.api.git.commits.info(
      this.repo.owner, 
      this.repo.repo, 
      data.object.sha,
      this._initialTreeResponse(fileData, commitMessage, data.object.sha, callback)
    );
  }.bind(this);
}

GitHubCommit.prototype._initialTreeResponse = function(fileData, commitMessage, parentCommitSha, callback)
{
  //the response handler from step 1.5
  return function(err, data){
    //handle any errors sanely
    if(err){
      callback(err);
      return;
    }
    //build the blob information object
    var blobInfo = {
      base_tree: data.tree.sha,
      tree: fileData
    }
    
    //step 2 - put your junk in the box
    //and by that i mean squirt the changes into a new tree in github
    this.api.git.trees.create(
      this.repo.owner, 
      this.repo.repo, 
      blobInfo, 
      this._createTreeResponse(commitMessage, parentCommitSha, callback)
    );
    
  }.bind(this);
}

GitHubCommit.prototype._createTreeResponse = function(commitMessage, parentCommitSha, callback)
{
  //the response handler from step 2
  return function(err, data){
    //handle any errors sanely
    if(err){
      callback(err);
      return;
    }
    
    //build the commit information
    var commitInfo = {
      message: commitMessage,
      tree: data.sha,
      parents: [parentCommitSha]
    }
    
    //step 3 - have her open the box
    //and by that i mean create the new commit for this tree
    this.api.git.commits.create(
      this.repo.owner, 
      this.repo.repo, 
      commitInfo, 
      this._createCommitResponse(callback)
    );
    
  }.bind(this);
}

GitHubCommit.prototype._createCommitResponse = function(callback)
{
  //the response handler from step 3
  return function(err, data){
    //handle any errors sanely
    if(err){
      callback(err);
      return;
    }
    
    //set up the reference data for the change to the tree
    var refInfo = {
      sha: data.sha
    }
    
    //and that's the way we do it
    this.api.git.refs.update(
      this.repo.owner, 
      this.repo.repo, 
      this.repo.ref, 
      refInfo,
      callback
    );
    
  }.bind(this);
}

GitHubCommit.prototype._cleanFileData = function(fileData)
{
  //initialise the array
  var returnArray = [];
  
  //set the blob type and the file type for the blob if none are set
  for( var k in fileData){
    var file = fileData[k];
    var newFile = {}
    
    if(file.content && file.path){
      newFile.content = file.content;
      newFile.path = file.path;
    }
    
    if(!file.blob){
      newFile.blob = '100644';
    } else {
      newFile.blob = file.blob;
    }
    if(!file.type){
      newFile.type = 'blob';
    } else {
      newFile.type = file.type;
    }
    returnArray.push(newFile);
  }
  
  return returnArray;
}

module.exports = GitHubCommit;