app.config(function($stateProvider) {
	$stateProvider
		.state("userDash.project", {
			url: '/:projectId',
			templateUrl: "js/project/project.html",
			controller: "ProjectController",
			resolve: {
				project: function(ProjectFactory, $stateParams) {
					return ProjectFactory.getProject($stateParams.projectId)
				}
			}
		});
})


app.controller("ProjectController", function($scope, $compile, UILibraryFactory, EmitterizerFactory, Interactory, StyleFactory, ParseTreeFactory, CssTreeFactory, $stateParams, project, user) {
	console.log($stateParams);

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
		$scope.currentlySelected = null;
	}
	$scope.removeRow = function() {
		var thisParent = $scope.currentlySelected.parent()[0]
		$scope.parseTree = ParseTreeFactory.removeRow($scope, thisParent.className.split(' ')[1], $scope.parseTree);
		$scope.$digest();
	}

	EmitterizerFactory.makeEmitterListeners($scope);

	Interactory.Interact($scope);
});