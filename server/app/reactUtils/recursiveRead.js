var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');

var arr = [];
module.exports = function(userId, buildId, projectName){
	var baseFilePath = path.join(__dirname, "UserBuilds", userId, buildId);

	projectName = projectName || 'reactNative';

	(function recursiveRead(filePath){
		var files = fs.readdirSync(filePath);
		files.forEach(function(file){
			var newFilePath = path.join(filePath, file);
			var stat = fs.statSync(newFilePath);
			if(stat.isDirectory()){
				if(file !== 'node_modules') recursiveRead(newFilePath);	
			} 
			else arr.push(newFilePath);
		});
		return arr;
	})(baseFilePath);

	var promiseArr = [];

	filesToRead.forEach(function(filePath){
		promiseArr.push(new Promise(function(resolve, reject){
			fs.readFile(filePath, function(err, data){
				if(err) reject(err);
				else resolve(data.toString());
			});
		}));
	});

	var fileObject = {};
	return Promise.each(promiseArr, function(fileContent){

	})
	.then(function(fileContent){
		for(var i = 0; i<fileContent.length; i++){
			var virtualFilePath = projectName + filesToRead[i].slice(baseFilePath.length);
			fileObject[virtualFilePath] = fileContent[i];
		}
		return fileObject;
	});
};

// var promisifiedReadDir = function(filePath){
// 	return new Promise(function(resolve, reject){
// 		fs.readdir(filePath, function(err, files){
// 			if(err) reject(err);
// 			else resolve(files);
// 		});
// 	});
// };

// var promisifiedStat = function(filePath){
// 	return new Promise(function(resolve, reject){
// 		fs.stat(filePath, function(err, stat){
// 			if(err) reject(err);
// 			else resolve(stat);
// 		});
// 	});
// };

// var promisifiedReadFile = function(filePath){
// 	return new Promise(function(resolve, reject){
// 		fs.readFile(filePath, function(err, data){
// 			if(err) reject(err);
// 			else resolve(data);
// 		});
// 	});
// };

// module.exports = function(baseFilePath, projectName){
// 	var fileObject = {};
// 	var virtualPaths = [];
// 	projectName = projectName || 'reactNative';
// 	var arr=[];

// 	var recursiveRead = function(filePath){
// 		var newFilePath = [];
// 		return promisifiedReadDir(filePath)
// 		.then(function(files){
// 			var statPromiseArray = files.map(function(file, index){
// 				newFilePath.push(path.join(filePath, file));
// 				return promisifiedStat(path.join(filePath, file));
// 			});
// 			return Promise.each(statPromiseArray, function(){});
// 		})
// 		.then(function(stat){
// 			// return newFilePath.map(function(element, index){
// 			// 	if(stat[index].isDirectory()) recursiveRead(element);
// 			// 	else{
// 			// 		virtualPaths.push(projectName + element.slice(baseFilePath.length));
// 			// 		return promisifiedReadFile(element);
// 			// 	}
// 			// });

// 			newFilePath.forEach(function(file, index){
// 				if(stat[index].isDirectory()) recursiveRead(file);
// 				else{
// 					virtualPaths.push(projectName + file.slice(baseFilePath.length));
// 					arr.push(promisifiedReadFile(file));
// 				}
// 			});

// 			return arr;	
// 		})
// 		.then(function(promiseReadFileArray){
// 			return Promise.each(promiseReadFileArray, function(){});
// 		})
// 		.then(function(fileContent){
// 			console.log(virtualPaths.length)
// 			virtualPaths.forEach(function(element, index){
// 				fileObject[element] = fileContent[index];
// 			});

// 			return fileObject;
// 		});

// 	};

// 	return recursiveRead(baseFilePath);
// };




