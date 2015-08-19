app.factory("EmitterizerFactory", function() {
	return {
		makeEmitterListeners: function($scope) {
			//put all the emit listeners for edit-page in here
			$scope.$on('changeSelect', function(event, data) {
				$scope.currentlySelected = $(data)
				$scope.$apply()
			});
		}
	}
})