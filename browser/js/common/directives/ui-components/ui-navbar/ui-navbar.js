app.directive("uiNavbar", function() {
	return {
		restrict: "E",
		templateUrl: 'js/common/directives/ui-components/ui-navbar/ui-navbar.html',
		link: function(scope,elem) {
			$(elem).on('click',function(){
				console.log("you clicked",elem)
			})
		}
	}
})