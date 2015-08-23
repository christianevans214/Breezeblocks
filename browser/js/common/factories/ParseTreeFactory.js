app.factory('ParseTreeFactory', function($http) {

	var count = 5;
	return {
		parseTree: {},
		addRow: function($scope) {
			var classToReturn = 'view-' + (count++)
			this.parseTree.tree.push({
				className: ['drop-area', classToReturn],
				children: []
			})
			$scope.$digest();
			return classToReturn;
		},

		addElement: function($scope, parentClass, type) {
			var filteredViewElem = this.parseTree.tree.filter(function(View) {
				return (View.className[1] === parentClass);
			})[0]
			var classToReturn = parentClass + '-' + type.toLowerCase() + '-' + (count++)
			filteredViewElem.children.push({
				type: type,
				className: ['ui-' + type.toLowerCase(), classToReturn],
				props: [{}]
			})
			$scope.$digest();
			return classToReturn;
		},

		removeRow: function($scope, className, parseTree) {
			//still can't do this.
			console.log("DA CLASS", className);
			console.log("BEFORE:", this.parseTree.tree)
			return this.parseTree.tree = this.parseTree.tree.filter(function(View) {
				console.log(View.className[1]);
				return (View.className[1] !== className)
			})
		},

		removeElement: function($scope, elem, parent) {
			var parentClassName = parent.className.split(" ");
			var childClassName = elem[0].className.split(" ");
			var container = this.parseTree.tree.filter(function(View) {
				return (parentClassName[1] === View.className[1])
			})[0]
			container.children = container.children.filter(function(child) {
				return (child.className[1] !== childClassName[1]);
			});
		},
		addProperties: function($scope, elem, parent) {
			var parentClassName = parent.className.split(" ");
			var childClassName = elem[0].className.split(" ");
			var container = this.parseTree.tree.filter(function(View) {
				return (parentClassName[1] === View.className[1])
			})[0]
			var childToChange = container.children.filter(function(child) {
				return (child.className[1] === childClassName[1]);
			})[0];
			console.log(childToChange);
		},
		findActiveElement: function($scope, className, parent) {
			// console.log('CLASSNAME', className, "PARENT", parent);
			var uniqueParentClassName = parent.className.split(" ")[1];
			var container = this.parseTree.tree.filter(function(View) {
				return (uniqueParentClassName === View.className[1])
			})[0]
			return container.children.filter(function(child) {
				return (child.className[1] === className);
			})[0];
			// return activeElement;
		}
	}
})