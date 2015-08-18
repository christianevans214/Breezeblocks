app.config(function($stateProvider) {

	// Register our *about* state.
	$stateProvider.state('editPage', {
		url: '/edit',
		controller: 'EditPageController',
		templateUrl: 'js/edit-page/edit-page.html'
	});

});

app.controller('EditPageController', function($scope, $compile, UILibraryFactory) {
	// console.log(UILibraryFactory.uiNavbar);
	$scope.uiLibrary = UILibraryFactory;
	$scope.editProps = {};
	$scope.currentlySelected = "Hi";
	// $scope.uiNavbar = {
	// 	"hey": "What"
	// }
	$scope.parseTree = {};
	$scope.addToParseTree = function() {};
	$scope.createReactClass = function() {};
	$scope.changeColor = function(){
		$scope.currentlySelected.css('background-color', $scope.editProps.color);
	}
	$scope.$on('changeSelect',function(event, data){
		var thing = $(data);
		console.log(thing);
		$scope.currentlySelected = $(data)
		$scope.$apply()
	})

	interact('#app')
		.dropzone({
			accept: '#dropThumb',
			overlap: 0.75,
			ondrop: function(event){
				// console.log($scope.UILibrary[event.component])
				var thisComponentName = $(event.relatedTarget).attr('component').split(".")[1];
				console.log (thisComponentName);
				// var componentObject = eval("$scope." + thisComponentName);
				// console.log(thisComponentName);
				// console.log("mouseup","in",event)
				var toAppend = $compile($scope.uiLibrary[thisComponentName].html)($scope);
				$(event.target).append(toAppend);
				// console.log("ELEMENT", elem, "ELEMENT PARENT", elem.parent());
				console.log("WHAT THIS WORKED")
					
			}

		})



	interact('.drop-area')
		.dropzone({
			accept: '#elemThumb',
			ondrop: function(event){
				// console.log($scope.UILibrary[event.component])
				var thisComponentName = $(event.relatedTarget).attr('component').split(".")[1];
				console.log (thisComponentName);
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
			edges: {bottom: true},
		})
		.on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    // target.textContent = event.rect.width + '×' + event.rect.height;
  });

});