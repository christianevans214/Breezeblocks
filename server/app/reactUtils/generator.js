var Handlebars = require('handlebars');
var ChangeCase = require('change-case');
var path = require('path');
var fs = require('fs-extra');
var zip = new require('node-zip')();

var tabBarGenerator = require('./tabBarGenerator.js');


var templatePath = path.join(__dirname, 'template.hbs');
var reactNativePath = path.join(__dirname, '../../../reactNative');

module.exports = function(pages, userId, buildId) {
		var tabBarData;
		var tabBarStyleData;
		var title = [];

		var newProjectDir = path.join(__dirname, 'UserBuilds', userId, buildId);
		var newProjectZipDir = path.join(__dirname, 'UserBuilds', userId, buildId + 'ZIPPED');


		return new Promise(function(resolve, reject) {
				fs.copy(reactNativePath, newProjectDir, function(err) {
					if (err) reject(err);
					else resolve(newProjectDir);
				});
			})
			.then(function() {
				return new Promise(function(resolve, reject) {
					fs.readFile(templatePath, function(err, data) {
						if (err) reject(err);
						else {
							resolve(data.toString());
						}
					});
				});
			})
			.then(function(templateFile) {
				console.log("loading template");
				Handlebars.registerHelper('getProp', function(propKey, propValue) {
					if (propKey === "source") return "{{uri: '" + propValue + "'}}";
					else if (propKey === "resizeMode") return "'" + propValue + "'";
					else return propValue;
				});

				Handlebars.registerHelper('camelCase', function(string) {
					return ChangeCase.camelCase(string);
				});

				Handlebars.registerHelper('removePx', function(string, styleType) {
					if(typeof string === "string"){	
						string = string.replace(/px$/, "");
						
						if(string.match(/[^0-9]|^\./) === null) string = Number(string);
						else string = "'" + string + "'";
					}

					if(styleType === "height" || styleType==="width"){
						string = string * 1.25;
						if(styleType === "height" && string>667) string = 667;
						if(styleType === "width" && string>375) string = 375;
					}
					return string;
				});

				var createTemplate = Handlebars.compile(templateFile);

				var templateArr = [];
				pages.forEach(function(page, index){					
					var data = page.html;
					var styleData = page.css;
					if(pages.length > 1) title.push(page.title + ".js");
					else title = ["index.ios.js"];

					data = data.filter(function(htmlElement){
						if(htmlElement.children[0].type === "TabBarIOS" && index === 0){
							tabBarData = htmlElement;
							tabBarStyleData = styleData;
						}
						return htmlElement.children[0].type !== "TabBarIOS"; 
					});
					templateArr.push(createTemplate({
						tree: data,
						styleTree: styleData
					}));

				});

				var promiseArr = [];

				templateArr.forEach(function(template, index){
					promiseArr.push(
						new Promise(function(resolve, reject) {
							fs.writeFile(newProjectDir +"/" + title[index], template, function(err) {
								if (err) reject(err);
								else resolve(template);
							});
						})
					);
				});

				return Promise.all(promiseArr);

			})
			.then(function(finaltemp) {
				console.log("file saved!");
				return tabBarGenerator(tabBarData, tabBarStyleData, title, newProjectDir);
			})
			.then(function(tabBarFile){
				return newProjectDir;
			})
			.then(function(newProjDir) {
				//zip the created project
				zip.file(newProjDir);
				var zippedFile = zip.generate({
					base64: false,
					compression: 'DEFLATE'
				});
				return new Promise(function(resolve, reject) {
					console.log("FILE ZIPPED");
					fs.writeFile(newProjectZipDir, zippedFile, 'binary', function(err) {
						if (err) reject(err);
						else resolve(newProjectZipDir);
					});
				});
			});



		// Handlebars.registerPartial('View', require('fs').readFileSync('./testPartial.hbs'));
};


//recursive version
/*	var reactDOM = "";
	for(var i = 0; i < json.length; i++){
	    reactDOM += domMaker(json[i]);
	}
	return reactDOM;

	function domMaker(component){
	    var domEle="";
	    var key = Object.keys(component)[0];
	    var prop = "";
	    var style = "";
	    var props = component[key].props;
	    var classNames = component[key].className;
	    var children = component[key].children;
	    
	    for(var propKey in props){
	        if(typeof props[propKey] !== Number){
	            prop += " " + propKey + "='" + props[propKey] + "'";  
	        }else{
	            prop += " " + propKey + "=" + props[propKey];  
	        }
	    }
	    
	    var className = " style={[";
	    for(var j = 0; j<classNames.length; j++){
	        className += "styles." + classNames[j];
	        if(j<classNames.length-1) className += ", ";
	    }
	    className += "]}";
	    
	    domEle += "<" + key + className + prop;
	    for(var j = 0; j<children.length; j++){
	        if(j===0) domEle += ">";
	        domEle += domMaker(children[j]);
	    }
	    
	    if(children.length === 0){
	        domEle += "/>";
	    }else{
	        domEle += "</" + key + ">";
	    }
	    return domEle;
	}*/