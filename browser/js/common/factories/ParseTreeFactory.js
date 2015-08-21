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
				props: [{}]
			})
			$scope.$digest();
			return classToReturn;
		},

		removeRow: function($scope,className){
			//still can't do this.
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
		},
		addProperties: function($scope, elem, parent){
			var parentClassName = parent.className.split(" ");
			var childClassName = elem[0].className.split(" ");
			var container = this.parseTree.tree.filter(function(View){ 
				return (parentClassName[1] === View.className[1])
			})[0]
			var childToChange = container.children.filter(function(child){ 
				return (child.className[1] === childClassName[1]);
			})[0];
			console.log(childToChange);
		},
		findActiveElement: function($scope, className, parent){
			// console.log('CLASSNAME', className, "PARENT", parent);
			var uniqueParentClassName = parent.className.split(" ")[1];
			var container = this.parseTree.tree.filter(function(View){ 
				return (uniqueParentClassName === View.className[1])
			})[0]
			console.log("VIEW CONTAINER", container);
			return container.children.filter(function(child){ 
				return (child.className[1] === className);
			})[0];
			// return activeElement;
		}
	}
})