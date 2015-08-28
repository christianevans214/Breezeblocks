app.factory('ParseTreeFactory', function($http) {

	return {
		addRow: function($scope) {
			var classToReturn = 'view-' + ($scope.project.viewCount++)
			$scope.project.html.push({
				className: ['drop-area', classToReturn],
				children: []
			})
			return classToReturn;
		},

		addElement: function($scope, parentClass, type) {
			var filteredViewElem = $scope.project.html.filter(function(View) {
				return (View.className[1] === parentClass);
			})[0]
			var classToReturn = parentClass + '-' + type.toLowerCase() + '-' + ($scope.project.viewCount++)

			//Type check to make sure we see something when an image is placed onto the screen
			if (type == "Image") {

				filteredViewElem.children.push({
					type: type,
					className: ['ui-' + type.toLowerCase(), classToReturn],
					props: [{
						"source": "https://scontent-lga1-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/390469_103735846412710_468610899_n.jpg?oh=c08c11408e17d55d11c05431a3f9efdb&oe=5683D084",
						"resizeMode": 'cover'
					}]
				})
			} else if (type === "ListView") {
				filteredViewElem.children.push({
					type: type,
					className: ['ui-' + type.toLowerCase(), classToReturn],
					props: [{
						dataSource: [{
							index: 0,
							value: "Lorem ipsum dolor sit amet"
						}, {
							index: 1,
							value: "Proin tempus volutpat lectus"
						}, {
							index: 2,
							value: "Praesent in orci scelerisque"
						}]
					}]
				})
			} else if (type === "ScrollView") {
				filteredViewElem.children.push({
					type: type,
					className: ['ui-' + type.toLowerCase(), classToReturn],
					props: [{
						dataSource: [{
							index: 0,
							value: "http://www.viralnovelty.net/wp-content/uploads/2014/07/121.jpg"
						}, {
							index: 1,
							value: "http://imgscenter.com/images/2014/09/13/Beauty-of-nature-random-4884759-1280-800.jpg"
						}, {
							index: 2,
							value: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcShVpqAWrvxn8f2-XGo0ES0XP555GrVnU83y4v5kxBg8wOK9m1E"
						}]
					}]
				})
			} else if (type === "MapView") {
				filteredViewElem.children.push({
					type: type,
					className: ['ui-' + type.toLowerCase(), classToReturn],
					props: [{
						region: {}
					}]
				})
			} else if (type === "TabBarIOS") {
				filteredViewElem.children.push({
					type: type,
					className: ['ui-' + type.toLowerCase(), classToReturn],
					props: [{
						TabBarIOSItems: []
					}]
				})
			} else if (type === "Text") {
				filteredViewElem.children.push({
					type: type,
					className: ['ui-' + type.toLowerCase(), classToReturn],
					props: [{
						value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut neque eget sem egestas varius."
					}]
				})
			} else if (type === "Navbar") {
				filteredViewElem.children.push({
					type: type,
					className: ['ui-' + type.toLowerCase(), classToReturn],
					props: [{
						value: "My Cool App"
					}]
				})
			} else {

				filteredViewElem.children.push({
					type: type,
					className: ['ui-' + type.toLowerCase(), classToReturn],
					props: [{}]
				})
			}

			return classToReturn;
		},

		removeRow: function($scope, className, parseTree) {
			//still can't do this.
			return $scope.project.html = $scope.project.html.filter(function(View) {
				return (View.className[1] !== className)
			})
		},

		removeElement: function($scope, elem, parent) {
			var parentClassName = parent.className.split(" ");
			var childClassName = elem[0].className.split(" ");
			var container = $scope.project.html.filter(function(View) {
				return (parentClassName[1] === View.className[1])
			})[0]
			container.children = container.children.filter(function(child) {
				return (child.className[1] !== childClassName[1]);
			});
			return childClassName;
		},
		addProperties: function($scope, elem, parent) {
			var parentClassName = parent.className.split(" ");
			var childClassName = elem[0].className.split(" ");
			var container = $scope.project.html.filter(function(View) {
				return (parentClassName[1] === View.className[1])
			})[0]
			var childToChange = container.children.filter(function(child) {
				return (child.className[1] === childClassName[1]);
			})[0];
		},
		findActiveElement: function($scope, className, parent) {
			console.log('CLASSNAME', className, "PARENT", parent.className);
			var uniqueParentClassName = parent.className.split(" ")[1];
			var container = $scope.project.html.filter(function(View) {
				return (uniqueParentClassName === View.className[1])
			})[0]
			return container.children.filter(function(child) {
				return (child.className[1] === className);
			})[0];
			// return activeElement;
		},
		addTabBarItemReference: function() {

		}
	}
})