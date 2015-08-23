app.factory('CssTreeFactory', function($http) {
	return {
		objToInlineStyle: function(className, $scope) {
			var str = ""
				// console.log(this.cssTree)
			for (var selector in this.cssTree[className]) {
				str += selector + ': ' + this.cssTree[className][selector];
				if (selector === "margin" || selector === "padding") str += "px";
				str += ";"
			}
			return str
		},
		addViewClass: function(className, $scope) {
			$scope.project.css[className] = {};
		},
		addChildClass: function(className, $scope) {
			$scope.project.css[className] = {
				"flex-grow": 1
			};
		},
		removeStyle: function(className, $scope) {

		},
		removeRowStyle: function(rowClassName, $scope) {

		}

	}
})