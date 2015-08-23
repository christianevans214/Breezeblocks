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


app.controller("ProjectController", function(ProjectFactory, $scope, $compile, UILibraryFactory, EmitterizerFactory, Interactory, StyleFactory, ParseTreeFactory, CssTreeFactory, $stateParams, project, user) {
	//Get project here
	//All factories will also take in only the project HTML or project CSS on THIS scope, to avoid the problem we're having with factory trees
	$scope.convertObjToInlineStyle = CssTreeFactory.objToInlineStyle;
	$scope.project = project;
	$scope.project["css"] = $scope.project.css || {};
	$scope.cssTree = project.css;
	$scope.uiLibrary = UILibraryFactory;
	//properties to edit styling:
	$scope.activeCSSEdit = {};
	//properties to edit HTML
	$scope.activeHTMLEdit = {};
	$scope.currentlySelected = null;

	$scope.saveProject = function(updatedProject) {

		ProjectFactory.updateProject(updatedProject._id, updatedProject)
			.then(function(returnedProject) {
				console.log("This worked");
			});

	}

	$scope.pathName = function(elemPath) {
		return "js/common/components/" + elemPath + ".html"
	}


	$scope.changeSelected = function(className) {
		if ($scope.currentlySelected) $scope.currentlySelected.removeClass('shadow')
		$scope.activeCSSEdit = $scope.project.css[className];
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
		console.log("COMMENCE DELETING", $scope.currentlySelected, thisParent)
		ParseTreeFactory.removeElement($scope, $scope.currentlySelected, thisParent)
		$scope.activeCSSEdit = {};
		$scope.activeHTMLEdit = {};
		$scope.currentlySelected = null;
	}
	$scope.removeRow = function() {
		var thisParent = $scope.currentlySelected.parent()[0]
		$scope.project.html = ParseTreeFactory.removeRow($scope, thisParent.className.split(' ')[1], $scope.project.html);
		$scope.$digest();
	}

	EmitterizerFactory.makeEmitterListeners($scope);

	Interactory.Interact($scope);
});