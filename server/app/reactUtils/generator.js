var handlebars = require('handlebars');
var fs = require('fs');

var template = handlebars.compile(fs.readFileSync('/Users/PT/Fullstack/DrandAndDrop/server/app/reactUtils/template.js', 'utf8'));

var output = template({
	renderElements: "<View style={[styles.container, styles.test]}><BasicScrollView style={[styles.somerandomclass, styles.somerandomclass2]} horizontally='true'/><BasicScrollView style={[styles.someotherclass, styles.someotherclass2]} horizontally='false'/></View>",
	styleObject: "container: {flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',},"
})

console.log("output");
fs.writeFile('/Users/PT/Fullstack/DrandAndDrop/server/app/reactUtils/renderedTemplate.js', output, function(err){
	if(err) throw err;
	console.log('filed saved')
})



