app.factory('CssTreeFactory', function($http) {
	return {
		objToInlineStyle: function(className, $scope) {
			var str = ""
				// console.log(this.cssTree)
			for (var selector in this.cssTree[className]) {
				str += selector + ': ' + this.cssTree[className][selector];
				if (selector === "margin" || selector.match(/(padding)/) || selector === "font-size") str += "px";
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
		removeClass: function(className, $scope) {
			console.log("className to delete", className);
			console.log("BEFORE DELETE", $scope.project.css);
			console.log("CLASS NAME PROPERTIES", $scope.project.css[className])
			if ($scope.project.css[className]) delete $scope.project.css[className];
			console.log("AFTER DELETE", $scope.project.css);
		},
		removeViewClass: function(rowClassName, $scope) {
			var classDeleteArr = [rowClassName];
			var classNameRegex = new RegExp(rowClassName)
				//need to find Children based on parent className
			console.log("BEFORE DELETION", $scope.project.css);
			for (var className in $scope.project.css) {
				console.log(className.match(classNameRegex))
				if (className.match(classNameRegex)) delete $scope.project.css[className];
			}
			console.log("AFTER DELETION", $scope.project.css);
		}

	}
})