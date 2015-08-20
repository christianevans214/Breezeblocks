app.factory('ParseTreeFactory', function(){
	return {
		parseTree: {
			tree: 
			[
				{
					className: ['drop-area','view-1'],
					children: [
						{type: 'Navbar',
						className: ['ui-navbar', 'navbar-1'],
						content: ['My Cool App']
						},
						{type: 'Navbar',
						className: ['ui-navbar', 'navbar-1'],
						content: ['My Okay App']
						},
						{type: 'Navbar',
						className: ['ui-navbar', 'navbar-1'],
						content: ['My Bad App :(']
						}

					]
				},
				{
					className: ['drop-area','view-2'],
					children: [
						{type: 'Image',
						className: ["image",'image-2'],
						content: ['http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg']},
						{type: 'Image',
						className: ['image', 'image-1'],
						content: ['https://imgs.xkcd.com/comics/perl_problems.png']}
					]

				}
			]
		},
		//addToTree: function(){};
		//removeFromTree: function(){};
	}
})