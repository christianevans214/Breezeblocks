var fileContent = require('./recursiveRead');
var path = require('path');

module.exports = function(userId, buildId, repo, projectName){
	var filePath = path.join(__dirname, "UserBuilds", userId, buidId);

	fileContent(filePath)
	.then(function(fileObject){
		var keys = Object.keys(fileObject);
		console.log(keys.length);

		keys.forEach(function(fileName){
			repo.write('master', fileName, fileObject[fileName], 'Exported BreezeBlocks Project', function(err) {
				console.log("writing to file");
				if(err) console.error(err);
			});
		})
		
		//fileObject contains virtual file paths as keys and file content as values

		// console.log(fileObject);
		// console.log(fileObject[keys[0]].length);
	})
	.catch(function(err){console.log("promise error", err);});
}