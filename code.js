var Handlebars = require('Handlebars');
var ChangeCase = require('change-case');

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
			},
			{type: 'Image',
			 className: ['ui-image', 'view-2-image-2'],
			 props: [
			 	{ "name": "source", "value": "https://imgs.xkcd.com/comics/perl_problems.png", type: "string" }
			 ]	
			}			 
		]

	}
]

var templateFile = require('fs').readFileSync('./template.hbs').toString();

var typeToContentTranslator = {
	Navbar: 'title',
	Image: 'source'
};

// Handlebars.registerPartial('View', require('fs').readFileSync('./testPartial.hbs'));

Handlebars.registerHelper('getProp', function (propObj) {
	if(propObj.name === "source") return "{{uri: '" + propObj.value + "'}}";
	else if(propObj.type === "string") return "'" + propObj.value + "'";
	else return propObj.value; 
});

Handlebars.registerHelper('camelCase', function (string) {
	return ChangeCase.camelCase(string);
});


var createTemplate = Handlebars.compile(templateFile);

var renderedTemplate = createTemplate({ tree: data });

require('fs').writeFile('./whatever.js', renderedTemplate, console.error.bind(console));

