app.directive('hoverX',function(ParseTreeFactory){
	return {
		restrict: 'A',
		// transclude: false,
		link: function(scope, elem, attr){
			var $elem = $(elem)
			// var className = elem.className.split(' ')[1]
			$elem.on('mouseover', function(){
				console.log(scope.$parent)
				$elem.prepend('<span style="display: inline-block; position: absolute; float: left; align-self: flex-start;" class="x-button">x</span>')
				$('.x-button').on('click',function(){
					ParseTreeFactory.removeRow(scope.$parent, $elem.attr('class').split(" ")[1])
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