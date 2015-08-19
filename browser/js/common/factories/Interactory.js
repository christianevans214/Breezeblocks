app.factory("Interactory", function($compile) {
	return {
		Interact: function($scope) {
			interact('#app')
				.dropzone({
					accept: '#dropThumb',
					overlap: 0.75,
					ondrop: function(event) {
						var thisComponentName = $(event.relatedTarget).attr('component').split(".")[1];
						console.log(thisComponentName);
						var toAppend = $compile($scope.uiLibrary[thisComponentName].html)($scope);
						$(event.target).append(toAppend);
						console.log("WHAT THIS WORKED")

					}

				})



			interact('.drop-area')
				.dropzone({
					accept: '#elemThumb',
					ondrop: function(event) {
						// console.log($scope.UILibrary[event.component])
						var thisComponentName = $(event.relatedTarget).attr('component').split(".")[1];
						console.log(thisComponentName);
						// var componentObject = eval("$scope." + thisComponentName);
						// console.log(thisComponentName);
						// console.log("mouseup","in",event)
						var toAppend = $compile($scope.uiLibrary[thisComponentName].html)($scope);
						$(event.target).append(toAppend);
						// console.log("ELEMENT", elem, "ELEMENT PARENT", elem.parent());
						console.log("WHAT THIS WORKED")

					}
				})
				.resizable({
					edges: {
						bottom: true
					},
				})
				.on('resizemove', function(event) {
					var target = event.target,
						x = (parseFloat(target.getAttribute('data-x')) || 0),
						y = (parseFloat(target.getAttribute('data-y')) || 0);

					// update the element's style
					target.style.width = event.rect.width + 'px';
					target.style.height = event.rect.height + 'px';
					if($(event.target).children) console.log("HEY HERE'S THE RESIZING INFO", $(event.target).children[0]);
					// translate when resizing from top or left edges
					x += event.deltaRect.left;
					y += event.deltaRect.top;

					target.style.webkitTransform = target.style.transform =
						'translate(' + x + 'px,' + y + 'px)';

					target.setAttribute('data-x', x);
					target.setAttribute('data-y', y);
					// target.textContent = event.rect.width + '×' + event.rect.height;
				});

		}
	}
})