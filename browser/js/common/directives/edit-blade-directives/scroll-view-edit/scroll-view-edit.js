app.directive('scrollViewEdit', function () {
	return {
		restrict: "E",
		templateUrl: 'js/common/directives/edit-blade-directives/scroll-view-edit/scroll-view-edit.html',
		link: function (scope, elem, attr) {
			scope.addListItem = function (arr) {
				console.log("HEY FROM ADD SCROLL ITEM")
				var index = arr.length - 1;
				arr.push({
					index: ""
				});
			}
		}
	}
})