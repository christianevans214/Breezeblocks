app.config(function($stateProvider) {

	// Register our *about* state.
	$stateProvider.state('editPage', {
		url: '/edit',
		controller: 'EditPageController',
		templateUrl: 'js/edit-page/edit-page.html'
	});

});

app.controller('EditPageController', function($scope, UILibraryFactory) {
	// console.log(UILibraryFactory.uiNavbar);
	$scope.uiLibrary = UILibraryFactory;
	// $scope.uiNavbar = {
	// 	"hey": "What"
	// }
	$scope.parseTree = {};
	$scope.addToParseTree = function() {};
	$scope.createReactClass = function() {};
});