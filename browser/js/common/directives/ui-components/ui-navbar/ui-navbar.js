app.directive("uiNavbar", function() {
	return {
		restrict: "E",
		templateUrl: 'js/common/directives/ui-components/ui-navbar/ui-navbar.html',
		link: function(scope,elem,attr) {
			$(elem).on('click',function(){
				scope.$emit('changeSelect',elem)
				
			})
		}
	}
})