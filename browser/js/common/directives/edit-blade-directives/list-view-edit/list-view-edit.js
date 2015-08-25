app.directive('listViewEdit', function() {
	return {
		restrict: "E",
		templateUrl: 'js/common/directives/edit-blade-directives/list-view-edit/list-view-edit.html',
		link: function(scope, elem, attr) {
			scope.addListItem = function(arr) {
				console.log("HEY FROM ADD LIST ITEM")
				var index = arr.length - 1;
				arr.push({
					index: ""
				});
			}
		}
	}
})