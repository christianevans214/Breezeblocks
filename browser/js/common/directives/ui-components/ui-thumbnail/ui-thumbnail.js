app.directive("uiThumbnail", function($rootScope, $compile) {
	return {
		restrict: "E",
		scope: {
			component: "="
		},
		templateUrl: 'js/common/directives/ui-components/ui-thumbnail/ui-thumbnail.html',
		link: function(scope, elem, attr) {
			console.log("SCOPE.COMPONENT", scope.component);
			console.log(attr);
			console.log("THUMBNAIL", scope.component.thumbnail);
			elem.css('background-image', "url(" + scope.component.thumbnail + ")");
			//can hook into elements parent and place html of template into it.
			elem.click(function() {
				var toAppend = $compile(scope.component.html)(scope);
				$("#app").append(toAppend);
				// $rootScope.$apply();
				// $rootScope.$digest();
				console.log("ELEMENT", elem, "ELEMENT PARENT", elem.parent());
				console.log("WHAT THIS WORKED")
			})
		}
	}
})