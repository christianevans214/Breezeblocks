var Handlebars = require('Handlebars');
var ChangeCase = require('change-case');

var data = [
	{
		className: ['drop-area','view-1'],
		children: [
			{type: 'Navbar',
			 className: ['ui-navbar', 'view-1-navbar-1'],
			 content: ['My Cool App']
			},
			{type: 'Navbar',
			 className: ['ui-navbar', 'view-1-navbar-2'],
			 content: ['My Okay App']
			},
			{type: 'Navbar',
			 className: ['ui-navbar', 'view-1-navbar-3'],
			 content: ['My Bad App :(']
			}

		]
	},
	{
		className: ['drop-area','view-2'],
		children: [
			{type: 'Image',
			 className: ["ui-image",'view-2-image-1'],
			 content: ['http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg']},
			{type: 'Image',
			 className: ['ui-image', 'view-2-image-2'],
			 content: ['https://imgs.xkcd.com/comics/perl_problems.png']}
		]

	}
];

var templateFile = require('fs').readFileSync('./template.hbs').toString();

var typeToContentTranslator = {
	Navbar: 'title',
	Image: 'source'
};

// Handlebars.registerPartial('View', require('fs').readFileSync('./testPartial.hbs'));

Handlebars.registerHelper('getProp', function (element) {
	return typeToContentTranslator[element.type];
});

Handlebars.registerHelper('camelCase', function (string) {
	return ChangeCase.camelCase(string);
});

var createTemplate = Handlebars.compile(templateFile);

var renderedTemplate = createTemplate({ tree: data });

require('fs').writeFile('./whatever.js', renderedTemplate, console.error.bind(console));