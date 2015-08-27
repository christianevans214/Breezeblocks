var Handlebars = require('handlebars');
var ChangeCase = require('change-case');

module.exports= function(){

	Handlebars.registerHelper({

	});
	Handlebars.registerHelper('getProp', function(propKey, propValue) {
		if(propKey !== "value"){					
			if (propKey === "source") return "{{uri: '" + propValue + "'}} ";
			else if (typeof propKey === "string") return "'" + propValue + "' ";
			else return propValue + " ";
		}else return;
	});

	Handlebars.registerHelper('parentStyle', function(className, globalStyle){
		className = className.slice(1);
		if(globalStyle[className]) return 'style={[styles.'+ ChangeCase.camelCase(className)+']}';
		else return;
	});

	Handlebars.registerHelper('supplyProp', function(propKey){
		if(propKey!== "value"){
			return propKey + '=';
		}else return;
	});

	Handlebars.registerHelper('valueHelper', function(child){
		if(child.props[0] !== null && child.props[0].value) return child.props[0].value;
		else return;
	});

	Handlebars.registerHelper('camelCase', function(string) {
		return ChangeCase.camelCase(string);
	});

	Handlebars.registerHelper('appName', function(pages){
		if(pages.length>1) return 'module.exports';
		else return 'var reactNative';
	});

	Handlebars.registerHelper('multiPageCheck', function(pages){
		if(pages.length === 1) return "AppRegistry.registerComponent('reactNative', () => reactNative);";
		else return;
	});

	Handlebars.registerHelper('typeCheck', function(type){
		if(type === "Navbar") return "Text";
		else if(type === "Map") return "MapView";
		else return type;
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

	Handlebars.registerHelper('selectTypePartial', function (type) {
		return type;
	});
};