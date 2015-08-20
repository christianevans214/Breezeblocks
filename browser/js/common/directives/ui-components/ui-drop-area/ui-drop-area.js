app.directive("uiDropArea", function() {
	return {
		restrict: "E",
		link: function(scope,elem) {
			var $elem = $(elem);
			function repositionClasses(jQueryElement){
				scope.$emit('deleteClass', jQueryElement);
			}
			$elem.on('mouseenter', function(){
				$elem.prepend('<span style="display: inline-block; position: absolute; float: left; align-self: flex-start;" class="x-button">x</span>')
				$('.x-button').on('click',function(){
					repositionClasses($elem);
					$elem.remove();
					$(this).remove();
				})
			})
			$elem.on('mouseleave',function(){
				$('.x-button').remove();
			})
		}
	}
})