app.factory("StyleFactory", function() {
	return {
		lessFlex: function($scope) {
			return function() {
				// alert($scope.activeCSSEdit);
				if ($scope.activeCSSEdit['flex-grow'] > 1) {
					$scope.activeCSSEdit['flex-grow']--;
				}
			}
		},
		moreFlex: function($scope) {
			return function() {
				if ($scope.activeCSSEdit['flex-grow'] < 10) {
					$scope.activeCSSEdit['flex-grow']++;
				}
			}
		},
		leftAlign: function($scope){
			return function() {
				console.log("hey")
				$scope.activeCSSEdit['text-align'] = "left";
			}
		},
		rightAlign: function($scope){
			return function() {
				console.log("whats")
				$scope.activeCSSEdit['text-align'] = "right";
			}
		},
		centerAlign: function($scope){
			return function() {
				console.log("up")
				$scope.activeCSSEdit['text-align'] = "center";
			}
		}
	}
})