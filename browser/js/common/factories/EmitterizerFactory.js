app.factory("EmitterizerFactory", function() {
	return {
		makeEmitterListeners: function($scope) {
			//put all the emit listeners for edit-page in here
			$scope.$on('changeSelect', function(event, data) {
				if($scope.currentlySelected) $scope.currentlySelected.removeClass('shadow')
				$scope.currentlySelected = $(data)
				$scope.currentlySelected.addClass('shadow')
				$scope.editProps = {flexGrowSize: 1};
				$scope.$apply()
			});
			$scope.$on('deleteClass', function(event, data){
				var count = data.attr('class').slice(-1);
				console.log("Whoops", data.attr("class").slice(-1));
				[].slice.call(data.nextAll()).forEach(function(elem){
					console.log("before", $(elem).attr('class'));
					$(elem).addClass("view-" + count++).removeClass('view-'+count)
					console.log("after", $(elem).attr('class'));
				});
			});
		}
	}
})