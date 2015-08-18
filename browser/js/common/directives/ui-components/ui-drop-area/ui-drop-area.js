app.directive("uiDropArea", function() {
	return {
		restrict: "E",
		templateUrl: 'js/common/directives/ui-components/ui-drop-area/ui-drop-area.html',
		link: function(scope,elem) {
			$(elem).on('click',function(){
				console.log("you clicked",elem)
			})
		}
	}
})