app.config(function($stateProvider) {

	// Register our *about* state.
	$stateProvider.state('editPage', {
		url: '/edit',
		controller: 'EditPageController',
		templateUrl: 'js/edit-page/edit-page.html'
	});

});

function colorChange($scope) {
	$scope.$on('changeSelect', function(event, data) {
		$scope.currentlySelected = $(data)
		$scope.$apply()
	})
}

app.controller('EditPageController', function($scope, $compile, UILibraryFactory, EmitterizerFactory, Interactory, StyleFactory,ParseTreeFactory) {
	$scope.parseTree = ParseTreeFactory.parseTree.tree;
	$scope.pathName = function(elemPath){
		return "js/common/components/" + elemPath + ".html"
	}






	$scope.uiLibrary = UILibraryFactory;
	//properties to edit styling:
	$scope.editProps = {flexGrowSize: 1};
	//properties to edit HTML
	$scope.currentlySelected = null;
	$scope.addToParseTree = function() {};
	$scope.createReactClass = function() {};
	$scope.changeColor = StyleFactory.changeColor($scope);
	$scope.changeMargin = StyleFactory.changeMargin($scope);
	$scope.changePadding = StyleFactory.changePadding($scope);
	$scope.lessFlex = StyleFactory.lessFlex($scope);
	$scope.moreFlex = StyleFactory.moreFlex($scope);
	$scope.deleteElem = function(){
		$scope.currentlySelected.remove()
	}

	$scope.getClass = function(){
		return 1
	}

	//event emitter to catch whenever someone selects a template in the iPhone
	// $scope.$on('changeSelect', function(event, data) {
	// 	if($scope.currentlySelected) $scope.currentlySelected.removeClass('shadow')
	// 	$scope.currentlySelected = $(data)
	// 	$scope.currentlySelected.addClass('shadow')
	// 	$scope.editProps = {flexGrowSize: 1};
	// 	$scope.$apply()
	// });
	EmitterizerFactory.makeEmitterListeners($scope);

	Interactory.Interact($scope);
});