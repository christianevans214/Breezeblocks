app.factory("StyleFactory", function() {
	return {
		changeColor: function($scope) {
			return function() {
				$scope.currentlySelected.css('background-color', $scope.editProps.color);
			}
		},
		changeMargin: function($scope) {
			return function() {
				$scope.currentlySelected.css('padding', $scope.editProps.padding + "px");
				$scope.editProps.padding = undefined;
			}
		},
		changePadding: function($scope) {
			return function() {
				$scope.currentlySelected.css('margin', $scope.editProps.margin + "px");
				$scope.editProps.margin = undefined;
			}
		}
	}
})