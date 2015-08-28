var fileContent = require('./recursiveRead');
var path = require('path');
var chalk = require('chalk');

module.exports = function(userId, buildId, repo, projectName){
	var erroredFiles = {};
	return fileContent(userId, buildId, projectName)
	.then(function(fileObject){
		var keys = Object.keys(fileObject);
		console.log(keys.length);
		return new Promise(function(resolve, reject){		
			(function repoWrite(fileNames, fileObject, index){
				console.log(chalk.yellow("writing file number", index, fileNames[index]));
				repo.write('master', fileNames[index], fileObject[fileNames[index]], 'Exported BreezeBlocks Project', function(err) {
					if(err){
						erroredFiles[fileNames[index]] = fileObject[fileNames[index]];
						console.log(chalk.red("File error, will rewrite", fileObject[fileNames[index]]));
					}else{
						console.log(chalk.green("file written, files left:", fileNames.length-index));
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
	})
	.then(function(erroredFiles){
		var newKeys = Object.keys(erroredFiles);
		if(newKeys.length > 0){
			return new Promise(function(resolve, reject){
				var keyCount = 0;
				var errorInterval = setInterval(function(){
					repo.write('master', newKeys[keyCount], erroredFiles[newKeys[keyCount]], 'Exported Breezeblocks Project', function(err){
						if(err) reject(err);
						else {
							console.log(chalk.yellow("Rewriting file ", newKeys[keyCount]))
						}
					});
					keyCount++;
					if(keyCount >= newKeys.length) {
						clearInterval(errorInterval);
						resolve(erroredFiles);
					}
				}, 1000);
			})
		}
	})
};