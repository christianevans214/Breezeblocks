app.config(function($stateProvider) {
	$stateProvider
		.state("userDash.project", {
			url: '/:projectId',
			templateUrl: "js/project/project.html",
			controller: "ProjectController",
			resolve: {
				project: function(ProjectFactory, $stateParams) {
					return ProjectFactory.getProject($stateParams.projectId)
				},
				user: function(UserFactory, $stateParams) {
					return UserFactory.getUser($stateParams.id);
				}
			}
		});
})


app.controller("ProjectController", function(ProjectFactory, $rootScope, AuthService, $scope, $compile, UILibraryFactory, EmitterizerFactory, Interactory, StyleFactory, ParseTreeFactory, ZoomService, CssTreeFactory, $stateParams, project, user) {
	$scope.convertObjToInlineStyle = CssTreeFactory.objToInlineStyle;
	$scope.project = project;
	$scope.user = user;
	$scope.project["css"] = $scope.project.css || {};
	$scope.cssTree = project.css;
	$scope.thumbnails = UILibraryFactory.Thumbnails;
	$scope.gitHubURL;
	$scope.exporting;
	$scope.tabBar;
	$scope.activeTabItem = {};
	//properties to edit styling:
	$scope.activeCSSEdit = {};
	//properties to edit HTML
	$scope.activeHTMLEdit = {};

	//thsi will probably need to be edited later but yeah!
	$scope.exportProject = function(project, user, tabBar) {
		$scope.exporting = true;
		var pagesArr = [{
			html: project.html,
			css: project.css,
			title: project.title
		}];

		if (tabBar) {
			var tabBarIOSItemsArr = tabBar.props[0].TabBarIOSItems;
			for (var i = 0; i < tabBarIOSItemsArr.length; i++) {
				if (tabBarIOSItemsArr[i].projectReference) {

					user.projects.forEach(function(userProject) {

						if (userProject.title === tabBarIOSItemsArr[i].projectReference && userProject.title !== project.title) {
							pagesArr.push({
								html: userProject.html,
								css: userProject.css,
								title: userProject.title
							})
						}
					})
				}
			}
		}
		var objToExport = {
			pages: pagesArr,
			buildId: project._id,
			userId: user._id,
			title: project.title
		}
		console.log(objToExport)
		$scope.exporting = false;
		ProjectFactory.exportProject(objToExport)
			.then(function(ghURL) {
				$scope.exporting = false;
				console.log("THIS WORKED", ghURL);
				$scope.gitHubURL = ghURL
				$scope.$digest();
			})
	}

	$scope.currentlySelected = null;
	//selected Tab Item for connecting pages
	$scope.selectedTabItem = null;
	$scope.showConfirm = false;

	$scope.saveProject = function(updatedProject) {

		$scope.showConfirm = true;
		ProjectFactory.updateProject(updatedProject._id, updatedProject)
			.then(function(returnedProject) {
				console.log("This worked");
				$scope.showConfirm = false;
				$rootScope.$broadcast("project updated", returnedProject)
			});
	}


	$scope.pathName = function(elemPath) {
		return "js/common/components/" + elemPath + ".html";
	};



	$scope.changeSelected = function(className) {
		console.log("CLASSNAME OF CURRENTLY SELECTED", className)
		if ($scope.currentlySelected) $scope.currentlySelected.removeClass('shadow')
		$scope.activeCSSEdit = $scope.project.css[className];
		$scope.currentlySelected = $('.' + className);
		var thisParent = $scope.currentlySelected.parent()[0]
		$scope.currentlySelected.addClass('shadow')
		$scope.activeHTMLEdit = ParseTreeFactory.findActiveElement($scope, className, thisParent);
		if ($scope.activeHTMLEdit.type === "TabBarIOS") {
			console.log("I'M A TAB BAR IOS")
			$scope.tabBar = $scope.activeHTMLEdit;
		}
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
			} else {
				//for use in DeleteElem function
				console.log("else case")
				$scope.deselect();
				// console.log($scope.currentlySelected)
			}
		}
	}

	$scope.deselect = function() {
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

	//zoom level for app
	$scope.scalePercent = ZoomService.scalePercent;

	$scope.changeZoom = ZoomService.changeZoom;

	$scope.selectTabItem = function(index) {
		console.log("hey select tab function running here")
		if ($scope.activeHTMLEdit && $scope.activeHTMLEdit.type === "TabBarIOS") {
			var tab = $('.' + index);
			console.log("hey selecting tab here");
			console.log("index of tab", index);
			console.log($scope.activeHTMLEdit);
			if ($scope.selectedTabItem) $scope.selectedTabItem.removeClass('tab-selected');
			tab.addClass('tab-selected');
			$scope.selectedTabItem = tab;
			$scope.activeTabItem = $scope.activeHTMLEdit.props[0].TabBarIOSItems.filter(function(tabItem, i) {
				return (index === i)
			})[0]
			console.log($scope.activeTabItem)
		}


		// 	}, 1)
		//className in this context will be 
		// $scope.currentlySelected.addClass('shadow')
	}
});



//this doesn't really work all the time
// $scope.logEvent = function (message, event) {
// 	console.log(event, 'happened')
// var theElem = event.target
// var saveClass = event.target.className
// var thisClass = event.target.className.split(" ")[1]

// console.log('thisClass', thisClass)
// var saveThisClass = thisClass
// var parent;
// setTimeout(function () {

// 	//identify parent's number
// 	parent = $('.' + thisClass).closest('.drop-area');
// 	console.log(parent);
// 	var parentClass = parent.attr('class').split(" ")[1]
// 	var thisViewNum = thisClass.split(" ")[0].split("-")[1]
// 	var parentViewNum = parentClass.split("-")[1]

// 	//figure out what to change:
// 	console.log(thisViewNum, "should be", parentViewNum)


// 	//create new class string
// 	var originalClassArr = thisClass.split("-");
// 	originalClassArr[1] = parentViewNum
// 	var newClass = originalClassArr.join("-");

// 	//add the class back
// 	$('.' + thisClass).removeClass(thisClass).addClass(newClass)
// 	console.log('THE ELEM AFTER', $('.' + newClass))

// 	//update css
// 	var oldProps = $scope.cssTree[saveThisClass]
// 	$scope.cssTree[newClass] = oldProps
// 	delete $scope.cssTree[saveThisClass]

// }, 500)