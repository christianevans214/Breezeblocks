var Handlebars = require('handlebars');
var ChangeCase = require('change-case');

module.exports= function(){

	Handlebars.registerHelper({
		getProp: function(propKey, propValue) {
			if(propKey !== "value"){					
				if (propKey === "source") return "{{uri: '" + propValue + "'}} ";
				else if (typeof propKey === "string") return "'" + propValue + "' ";
				else return propValue + " ";
			}else return;
		},
		setMapCoords: function(propKey, propValue){
		    if(propKey === 'region'){
		        return 'latitude=' + '{' + propValue['latitude'] + '}' + ' longitude=' + '{' + propValue['longitude'] + '}' + ' latitudeDelta=' + '{' + propValue['latitudeDelta'] + '}' + ' longitudeDelta=' + '{' + propValue['longitudeDelta'] + '}';
		    }else return ' ' + propKey + '={' + propValue + '}';
		},
		parentStyle: function(className, globalStyle){
			className = className.slice(1);
			if(globalStyle[className]) return 'style={[styles.'+ ChangeCase.camelCase(className)+']}';
			else return;
		},
		supplyProp: function(propKey){
			if(propKey!== "value"){
				return propKey + '=';
			}else return;
		},
		valueHelper: function(child){
			if(child.props[0] !== null && child.props[0].value) return child.props[0].value;
			else return;
		},
		camelCase: function(string) {
			return ChangeCase.camelCase(string);
		},
		appName: function(pages, bool){
			if(pages.length>1 || bool) return 'module.exports';
			else return 'var reactNative';
		},
		multiPageCheck: function(pages){
			if(pages.length === 1) return "AppRegistry.registerComponent('reactNative', () => reactNative);";
			else return;
		},
		typeCheck: function(type){
			if(type === "Navbar") return "Text";
			else if(type === "Map") return "MapView";
			else return type;
		},
		removePx: function(string, styleType) {
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
		},
		selectTypePartial: function (type) {
			return type;
		}

	});

};