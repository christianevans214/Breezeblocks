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

app.controller('EditPageController', function($scope, $compile, UILibraryFactory, EmitterizerFactory, Interactory, StyleFactory, ParseTreeFactory, CssTreeFactory) {
	$scope.convertObjToInlineStyle = CssTreeFactory.objToInlineStyle;
	$scope.cssTree = CssTreeFactory.cssTree;
	$scope.parseTree = ParseTreeFactory.parseTree.tree;
	$scope.uiLibrary = UILibraryFactory;
	//properties to edit styling:
	$scope.activeCSSEdit = {};
	//properties to edit HTML
	$scope.activeHTMLEdit = {};
	$scope.currentlySelected = null;

	$scope.pathName = function(elemPath) {
		return "js/common/components/" + elemPath + ".html"
	}


	$scope.changeSelected = function(className) {
		if ($scope.currentlySelected) $scope.currentlySelected.removeClass('shadow')
		$scope.activeCSSEdit = CssTreeFactory.cssTree[className];
		$scope.currentlySelected = $('.' + className);
		var thisParent = $scope.currentlySelected.parent()[0]
		$scope.currentlySelected.addClass('shadow')
		$scope.activeHTMLEdit = ParseTreeFactory.findActiveElement($scope, className, thisParent);
	}

	$scope.activeDropzone = function(className) {
		console.log($('.' + className[1]).prev().addClass('appear'));

	}



	$scope.lessFlex = StyleFactory.lessFlex($scope);
	$scope.moreFlex = StyleFactory.moreFlex($scope);
	$scope.deleteElem = function() {
		var thisParent = $scope.currentlySelected.parent()[0]
		ParseTreeFactory.removeElement($scope, $scope.currentlySelected, thisParent)
		$scope.activeCSSEdit = {};
		$scope.activeHTMLEdit = {};
	}
	$scope.removeRow = function() {
		var thisParent = $scope.currentlySelected.parent()[0]
		$scope.parseTree = ParseTreeFactory.removeRow($scope, thisParent.className.split(' ')[1], $scope.parseTree);
		$scope.activeCSSEdit = {};
		$scope.activeHTMLEdit = {};
		$scope.$digest();
	}

	EmitterizerFactory.makeEmitterListeners($scope);

	Interactory.Interact($scope);
});