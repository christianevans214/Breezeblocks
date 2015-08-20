/*var fs = require('fs');
var $ = require('jquery');
var Handlebars = require('handlebars');
var templateFile = require('./template.js');

console.log("GOT HERE")

var template = Handlebars.compile(templateFile);

var context = {
	"renderElements": "<View style={[styles.container, styles.test]}><BasicScrollView style={[styles.somerandomclass, styles.somerandomclass2]} horizontally='true'/><BasicScrollView style={[styles.someotherclass, styles.someotherclass2]} horizontally='false'/></View>",
	"styleObject": "container: {flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',},"
}

var compiledJSX = template(context);

fs.writeFile('renderedTemplate.js', compiledJSX, function(err){
	if(err) throw err;
	console.log('Saved File');
})*/

$(function(){
	console.log("GOT HERE")
	var templateScript = $('#template').html();
	// var templateScript = templateFile.$('#template').html();

	//Compile template
	var template = Handlebars.compile(template.html)
	// var template = Handlebars.compile(templateScript)

	//Define data object
	var context = {
		"renderElements": "<View style={[styles.container, styles.test]}><BasicScrollView style={[styles.somerandomclass, styles.somerandomclass2]} horizontally='true'/><BasicScrollView style={[styles.someotherclass, styles.someotherclass2]} horizontally='false'/></View>",
		"styleObject": "container: {flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',},"
	}

	//Pass data to the template
	var compiledJSX = template(context);

	//write file....
	$('.content-placeholder').html(compiledJSX);
/*	fs.writeFile('renderedTemplate.js', compiledJSX, function(err){
		if(err) throw err;
		console.log('Saved File');
	})*/
	
})
