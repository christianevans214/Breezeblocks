var shortid = require('shortid');
module.exports = function(currentUser, github, repoName){
	var user = github.getUser();
	//if user already has github repo with repo name, change repo name
	return new Promise(function(resolve, reject){
		if(!currentUser){
			reject(currentUser);
		}
		if(github.getRepo(currentUser.github.username, repoName)){
			repoName = repoName + '_' + shortid.generate;
			resolve(repoName);
		}
	})
}