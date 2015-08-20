var fs = require('fs');
var templateFile = require('./template.html');
	
$(function(){
	//var templateScript = $('#template').html();
	var templateScript = templateFile;

	//Compile template
	//var template = Handlebars.compile(template.js)
	var template = Handlebars.compile(templateScript)

	//Define data object
	var context = {
		"renderElements": "<View style={[styles.container, styles.test]}><BasicScrollView style={[styles.somerandomclass, styles.somerandomclass2]} horizontally='true'/><BasicScrollView style={[styles.someotherclass, styles.someotherclass2]} horizontally='false'/></View>",
		"styleObject": "container: {flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',},"
	}

	//Pass data to the template
	var compiledJSX = template(context);

	//write file....
	//$('.content-placeholder').html(compiledJSX);
	fs.writeFile('template.js', compiledJSX, function(err){
		if(err) throw err;
		console.log('Saved File');
	})
	
})
