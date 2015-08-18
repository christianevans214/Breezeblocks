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
	// $scope.uiNavbar = {
	// 	"hey": "What"
	// }
	$scope.parseTree = {};
	$scope.addToParseTree = function() {};
	$scope.createReactClass = function() {};

	interact('#app')
		.dropzone({
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

});