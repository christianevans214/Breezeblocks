module.exports = function(json){

	var data = [
		{
			className: ['drop-area','view-1'],
			children: [
				{type: 'Navbar',
				 className: ['ui-navbar', 'view-1-navbar-1'],
				 props: {"title": "my cool app"}
				},
				{type: 'Navbar',
				 className: ['ui-navbar', 'view-1-navbar-2'],
				 props: {"title": "my okay app"}
				},
				{type: 'Navbar',
				 className: ['ui-navbar', 'view-1-navbar-3'],
				 props: {"title": "my bad app"}
				},
				{type: 'Navbar',
				 className: ['ui-navbar', 'view-1-navbar-3'],
				 props: [
				 	{ "name": "title", "value": "the title", type: "string" }
				 ]
				}

			]
		},
		{
			className: ['drop-area','view-2'],
			children: [
				{type: 'Image',
				 className: ["ui-image",'view-2-image-1'],
				 props: {"source": 'http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg'}},
				{type: 'Image',
				 className: ['ui-image', 'view-2-image-2'],
				 props: {"source": 'https://imgs.xkcd.com/comics/perl_problems.png'}}
			]

		}
	]

	var reactDOM = "";
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
	}

};

