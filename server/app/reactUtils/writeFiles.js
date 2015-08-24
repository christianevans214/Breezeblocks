var fileContent = require('./recursiveRead');
var path = require('path');

module.exports = function(userId, buildId, repo, projectName){
	var erroredFiles = {};
	fileContent(userId, buildId, projectName)
	.then(function(fileObject){
		var keys = Object.keys(fileObject);
		console.log(keys.length);
		new Promise(function(resolve, reject){		
			(function repoWrite(fileNames, fileObject, index){
				console.log("fileNames", index, fileNames[index]);
				repo.write('master', fileNames[index], fileObject[fileNames[index]], 'Exported BreezeBlocks Project', function(err) {
					console.log("writing to file", index);
					if(err){
						erroredFiles[fileNames[index]] = fileObject[fileNames[index]];
						console.error(err);
					}

					index++;

					if(index < fileNames.length) {
						repoWrite(fileNames, fileObject, index);
					}
					else{
						resolve(erroredFiles);
					}
				});
			})(keys, fileObject, 0);
		})
		.then(function(erroredFiles){
			console.log("erroredFiles", erroredFiles)
			var newKeys = Object.keys(erroredFiles);
			if(newKeys.length > 0){
				var keyCount = 0;
				var errorInterval = setInterval(function(){
					repo.write('master', newKeys[keyCount], erroredFiles[newKeys[keyCount]], 'Exported Breezeblocks Project', function(err){
						if(err) console.log("There was still an error writing to github");
						else("Rewriting file ", newKeys[keyCount])
					});
					keyCount++;
					if(keyCount >= newKeys.length) clearInterval(errorInterval);
				}, 1000);
			}
		})
	})
	.catch(function(err){ 
		console.log("promise error", err); 
	});
};
