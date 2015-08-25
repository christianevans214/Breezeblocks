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


app.controller("ProjectController", function(ProjectFactory, AuthService, $scope, $compile, UILibraryFactory, EmitterizerFactory, Interactory, StyleFactory, ParseTreeFactory, CssTreeFactory, $stateParams, project, user) {
	//Get project here
	//All factories will also take in only the project HTML or project CSS on THIS scope, to avoid the problem we're having with factory trees
	$scope.convertObjToInlineStyle = CssTreeFactory.objToInlineStyle;
	$scope.project = project;
	$scope.user = user;
	$scope.project["css"] = $scope.project.css || {};
	$scope.cssTree = project.css;
	$scope.thumbnails = UILibraryFactory.Thumbnails;
	//properties to edit styling:
	$scope.activeCSSEdit = {};
	//properties to edit HTML
	$scope.activeHTMLEdit = {
		props: [{
			dataSource: [{
				value: '1'
			}, {
				value: '2'
			}]
		}]
	};

	//thsi will probably need to be edited later but yeah!
	$scope.exportProject = function(project, user) {
		console.log("PROJECT FOR EXPORT", project);
		console.log("USER FOR EXPORT", user);
		var objToExport = {
			html: project.html,
			css: project.css,
			buildId: project._id,
			userId: user._id,
			title: project.title
		}
		ProjectFactory.exportProject(objToExport)
			.then(function(file) {
				console.log("THIS WORKED", file);
			})
	}

	$scope.currentlySelected = null;
	$scope.showConfirm = false;
	$scope.saveProject = function(updatedProject) {
		$scope.showConfirm = true;
		ProjectFactory.updateProject(updatedProject._id, updatedProject)
			.then(function(returnedProject) {
				console.log("This worked");
				$scope.showConfirm = false;
			});
	}

	$scope.pathName = function(elemPath) {
		return "js/common/components/" + elemPath + ".html"
	}


	$scope.changeSelected = function(className) {
		console.log("CLASSNAME OF CURRENTLY SELECTED", className)
		if ($scope.currentlySelected) $scope.currentlySelected.removeClass('shadow')
		$scope.activeCSSEdit = $scope.project.css[className];
		$scope.currentlySelected = $('.' + className);
		// console.log($scope.currentlySelected.attr('component'));
		var thisParent = $scope.currentlySelected.parent()[0]
		$scope.currentlySelected.addClass('shadow')
		$scope.activeHTMLEdit = ParseTreeFactory.findActiveElement($scope, className, thisParent);
	}

	$scope.activeDropzone = function(className) {
		console.log($('.' + className[1]).prev().addClass('appear'));

	}

	$scope.lessFlex = StyleFactory.lessFlex($scope);
	$scope.moreFlex = StyleFactory.moreFlex($scope);
	$scope.leftAlign = StyleFactory.leftAlign($scope);
	$scope.rightAlign = StyleFactory.rightAlign($scope);
	$scope.centerAlign = StyleFactory.centerAlign($scope);




	$scope.selectLast = function() {
		if ($scope.currentlySelected) {
			var $lastSibling = $($scope.currentlySelected).prev()[0] || null;
			console.log($lastSibling)
			if ($lastSibling) {
				$scope.changeSelected($lastSibling.className.split(' ')[1])
			}
			else {
				//for use in DeleteElem function
				console.log("else case")
				$scope.deselect();
				// console.log($scope.currentlySelected)
			}
		}
	}

	$scope.deselect = function(){
		console.log("hello!")
		$scope.currentlySelected = null;
		$scope.activeCSSEdit = {};
		$scope.activeHTMLEdit = {};
	}

	$scope.selectNext = function() {
		if ($scope.currentlySelected) {
			var $nextSibling = $($scope.currentlySelected).next()[0] || null;
			if ($nextSibling) {
				$scope.changeSelected($nextSibling.className.split(' ')[1])
			}
		}
	}

	$scope.deleteElem = function() {
		var thisParent = $scope.currentlySelected.parent()[0]
		console.log("COMMENCE DELETING", $scope.currentlySelected, thisParent)
		var classNameToRemove = ParseTreeFactory.removeElement($scope, $scope.currentlySelected, thisParent);
		CssTreeFactory.removeClass(classNameToRemove[1], $scope)
		$scope.selectLast();

	}
	$scope.removeRow = function() {
		var thisParent = $scope.currentlySelected.parent()[0]
		var viewToRemove = thisParent.className.split(' ')[1]
		$scope.project.html = ParseTreeFactory.removeRow($scope, viewToRemove, $scope.project.html);
		//this remove Class all needs to remove all children classess
		CssTreeFactory.removeViewClass(viewToRemove, $scope)
		$scope.$digest();
	}

	EmitterizerFactory.makeEmitterListeners($scope);

	Interactory.Interact($scope);

	$scope.logout = function() {
		console.log("logging out")
		AuthService.logout().then(function() {
			$state.go('home');
		});
	};

	//changes with check
	$scope.showDropZones = true;



	//listen for key presses
	$(window).bind('keydown', function(e) {
		var code = e.keyCode;
		//left arrow
		if (code === 37) {
			$scope.selectLast()
		}
		//right arrow
		else if (code === 39) {
			$scope.selectNext()
		}
	});



});