app.config(function($stateProvider) {

	// Register our *about* state.
	$stateProvider.state('editPage', {
		url: '/edit',
		controller: 'EditPageController',
		templateUrl: 'js/edit-page/edit-page.html'
	});

});

app.controller('EditPageController', function($scope) {
	$(document).ready(function() {
		$('#Add').on('click', function() {
			//attempt to make more boxes, didn't work
			console.log("hey!")
			$('#Add').after('<div id="yes-drop" class="draggable drag-drop resize-drag"> #yes-drop </div>')
		})
	})

	interact('.draggable')
		.draggable({
			// enable inertial throwing
			inertia: true,
			// keep the element within the area of it's parent
			restrict: {
				restriction: "parent",
				endOnly: true,
				elementRect: {
					top: 0,
					left: 0,
					bottom: 1,
					right: 1
				}
			},

			// call this function on every dragmove event
			onmove: dragMoveListener,
			// call this function on every dragend event
			onend: function(event) {
				var textEl = event.target.querySelector('p');

				textEl && (textEl.textContent =
					'moved a distance of ' + (Math.sqrt(event.dx * event.dx +
						event.dy * event.dy) | 0) + 'px');
			}
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

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}

	// this is used later in the resizing demo
	window.dragMoveListener = dragMoveListener;

	/* The dragging code for '.draggable' from the demo above
	 * applies to this demo as well so it doesn't have to be repeated. */

	// enable draggables to be dropped into this
	interact('.dropzone').dropzone({
		// only accept elements matching this CSS selector
		accept: '#yes-drop',
		// Require a 75% element overlap for a drop to be possible
		overlap: 0.75,

		// listen for drop related events:

		ondropactivate: function(event) {
			// add active dropzone feedback
			event.target.classList.add('drop-active');
		},
		ondragenter: function(event) {
			console.log("dragged into", event)

			var draggableElement = event.relatedTarget,
				dropzoneElement = event.target;

			// feedback the possibility of a drop
			dropzoneElement.classList.add('drop-target');
			draggableElement.classList.add('can-drop');
			draggableElement.textContent = 'Dragged in';
		},
		ondragleave: function(event) {
			// remove the drop feedback style
			var childToRemove = $(event.relatedTarget)[0];
			console.log($(event.target)[0].children[0] === $(event.relatedTarget)[0]);

			// $(event.relatedTarget).detach()
			// console.log(event.relatedTarget)
			// $(event.target)[0].children.pop();
			// $('#Add').after(event.relatedTarget)
			// $(event.relatedTarget).removeAttr("style").removeAttr('data-x').removeAttr('data-y')
			// $event.target[0].children = $event.target[0].children.filter(function(child) {
			// 	return child !== childToRemove;
			// })
			event.target.classList.remove('drop-target');
			event.relatedTarget.classList.remove('can-drop');
			event.relatedTarget.textContent = 'Dragged out';
		},
		ondrop: function(event) {
			event.relatedTarget.textContent = 'Dropped';
			//appends to dom
			$(event.target).append(event.relatedTarget)
			interact('.draggable')
				.draggable({
					// enable inertial throwing
					inertia: true,
					// keep the element within the area of it's parent
					restrict: {
						restriction: "none",
					}
				})
			console.log(event.relatedTarget.style)
				//fixes positioning
			$(event.relatedTarget).removeAttr("style").removeAttr('data-x').removeAttr('data-y')


		},
		ondropdeactivate: function(event) {
			// remove active dropzone feedback
			event.target.classList.remove('drop-active');
			event.target.classList.remove('drop-target');
		}
	});



});