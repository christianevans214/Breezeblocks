var fileContent = require('./recursiveRead');
var path = require('path');

var filePath = path.join(__dirname, "UserBuilds", "55da1122f1d3d26d07ab67a8", "1234567");
fileContent(filePath, 'reactNative')
.then(function(fileObject){
	var keys = Object.keys(fileObject);
	console.log(keys.length);
	console.log(keys);

	//fileObject contains virtual file paths as keys and file content as values

	// console.log(fileObject);
	// console.log(fileObject[keys[0]].length);
})
.catch(function(err){console.log("promise error", err);});

// var fileObject = fileContent(filePath, 'reactNativeProject');
// console.log(Object.keys(fileObject));