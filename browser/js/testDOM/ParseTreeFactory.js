app.factory('ParseTreeFactory', function(){
	return {

		parseTree: {
			tree: 
			[
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
			]
		},

		addRow: function($scope){
			this.parseTree.tree.push({
				className: ['drop-area','view-'+(this.parseTree.tree.length+1)],
				children: []
			})
			$scope.$digest();
		},

		addElement: function($scope,parentClass, type){
			var filteredViewElem = this.parseTree.tree.filter(function(View){
				return (View.className[1] === parentClass);
			})[0]
			console.log("filteredElem",filteredViewElem)
			filteredViewElem.children.push({
				type: type,
				className: ['ui-'+ type.toLowerCase(), parentClass + '-' + type.toLowerCase() + '-' + (filteredViewElem.children.length + 1)],
				content: ["http://www.aspen-tech.com/wp-content/uploads/2014/09/Act-CRM-Sunset-Mode.jpg"]
			})
			$scope.$digest();
		},

		removeElement: function($scope, elem, parent){
			var parentClassName = parent.className.split(" ");
			var childClassName = elem[0].className.split(" ");
			var container = this.parseTree.tree.filter(function(View){ 
				return (parentClassName[1] === View.className[1])
			})[0]
			 container.children = container.children.filter(function(child){ 
				return (child.className[1] !== childClassName[1]);
			});
		}
		//addToTree: function(){};
		//removeFromTree: function(){};
	}
})