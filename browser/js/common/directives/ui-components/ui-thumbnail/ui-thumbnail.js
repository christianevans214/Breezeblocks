app.directive("uiThumbnail", function($rootScope) {
	return {
		restrict: "E",
		scope: {
			component: "=",
			background: '='
		},
		templateUrl: 'js/common/directives/ui-components/ui-thumbnail/ui-thumbnail.html',
		link: function(scope, elem, attr) {
			var clone;
			console.log("THUMBNAIL DIRECTIVE")
			console.log("DIRECTIVE SCOPE", scope);
			console.log("DIRECTIVE BACKGROUNDIMAGE", scope.background);
			console.log("DIRECTIVE component", scope.component);

			elem.css('background-image', "url(" + scope.background + ")");
			elem.addClass('thumb')
			$(elem).attr('component', scope.component);
			console.log("AFTER SETTING ATTRIBUT", elem)
			interact('.thumb')
				.draggable({
					// enable inertial throwing
					inertia: true,
					// call this function on every dragmove event
					onstart: function(event) {
						console.log("clicked")
						console.log(event.target)
						var holder = $(event.target).parent()
						clone = $(event.target).clone()
						clone.hide().appendTo(holder);
					},
					onmove: dragMoveListener,
					// call this function on every dragend event
					onend: function(event) {
							clone.fadeIn("fast");
							$(event.target).remove();
						}
						// var textEl = event.target.querySelector('p');

					// textEl && (textEl.textContent =
					//   'moved a distance of '
					//   + (Math.sqrt(event.dx * event.dx +
					//                event.dy * event.dy)|0) + 'px');
				});

			function dragMoveListener(event) {
				var target = event.target,
					// keep the dragged position in the data-x/data-y attributes

					x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
					y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				// translate the element
				target.style.webkitTransform =
					target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';
				// target.style.zIndex="100"
				// console.log(target.style.zIndex)

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			}
		}
	}
})