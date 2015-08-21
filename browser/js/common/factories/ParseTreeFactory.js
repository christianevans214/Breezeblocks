app.factory('ParseTreeFactory', function(){
	
	var count = 5;
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
			var classToReturn = 'view-'+(count++)
			this.parseTree.tree.push({
				className: ['drop-area',classToReturn],
				children: []
			})
			$scope.$digest();
			return classToReturn;
		},

		addElement: function($scope,parentClass, type){
			var filteredViewElem = this.parseTree.tree.filter(function(View){
				return (View.className[1] === parentClass);
			})[0]
			var classToReturn = parentClass + '-' + type.toLowerCase() + '-' + (count++)
			filteredViewElem.children.push({
				type: type,
				className: ['ui-'+ type.toLowerCase(), classToReturn],
				content: ["http://www.aspen-tech.com/wp-content/uploads/2014/09/Act-CRM-Sunset-Mode.jpg"]
			})
			$scope.$digest();
			return classToReturn;
		},

		removeRow: function($scope,className){
			console.log("DA CLASS", className);
			this.parseTree.tree = this.parseTree.tree.filter(function(View){
				return (View.className[1] !== className)
			})
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