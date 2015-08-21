app.factory("StyleFactory", function() {
	return {
		lessFlex: function($scope){
			return function(){
				// alert($scope.activeCSSEdit);
				if ($scope.activeCSSEdit['flex-grow'] > 1){
					$scope.activeCSSEdit['flex-grow']--;
				}
			}
		},
		moreFlex: function($scope){
			return function(){
				if ($scope.activeCSSEdit['flex-grow'] < 10){
					$scope.activeCSSEdit['flex-grow']++;
				}
			}
		}
	}
})