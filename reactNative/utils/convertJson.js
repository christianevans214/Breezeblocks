module.exports = function(json){

	var data = [
		{
			className: ['drop-area','view-1'],
			children: [
				{type: 'Navbar',
				 className: ['ui-navbar', 'view-1-navbar-1'],
				 props: [
				 	{ "name": "title", "value": "my cool app", type: "string" }
				 ]
				},
				{type: 'Navbar',
				 className: ['ui-navbar', 'view-1-navbar-2'],
				 props: [
				 	{ "name": "title", "value": "my okay app", type: "string" }
				 ]
				},
				{type: 'Navbar',
				 className: ['ui-navbar', 'view-1-navbar-3'],
				 props: [
				 	{ "name": "title", "value": "my bad app", type: "string" }
				 ]
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
 				 props: [
				 	{ "name": "source", "value": "http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg", type: "string" }
				 ]
				{type: 'Image',
				 className: ['ui-image', 'view-2-image-2'],
				 props: [
				 	{ "name": "source", "value": "https://imgs.xkcd.com/comics/perl_problems.png", type: "string" }
				 ]				 
			]

		}
	]

{
    "view1": {
        "flex": '1',
        "justify-content": 'center',
        "align-items": 'center',
        "background-color": '#F5FCFF',
    },
    "img1": {
        "width": '200px',
        "height": '200px',
    },
    "view2": {
        "flex": '1',
        "justify-content": 'center',
        "align-items": 'center',
        "background-color": '#F5FCFF',
    },
    "img2": {
        "width": '200px',
        "height": '200px',
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  img: {
    width: 200,
    height: 200,
  },
});

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

