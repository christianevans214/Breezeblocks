app.directive("uiImage", function() {
	return {
		restrict: "E",
		templateUrl: 'js/common/directives/ui-components/ui-image/ui-image.html',
		link: function(scope,elem,attr) {
			$(elem).on('click',function(){
				scope.$emit('changeSelect',elem)
				
			})
		}
	}
})