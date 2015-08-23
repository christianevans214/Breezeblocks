app.config(function($stateProvider) {
	$stateProvider
		.state("userDash", {
			url: "/:id",
			templateUrl: "js/user-dash/user-dash.html",
			controller: 'UserDashController',
			resolve: {
				user: function(UserFactory, $stateParams) {
					return UserFactory.getUser($stateParams.id);
				}
			}
		});
});

app.controller("UserDashController", function($scope, $state, UserFactory, ProjectFactory, user) {
	$scope.user = user;
	$scope.latestProject;
	$scope.createNewProject = function() {
		ProjectFactory.createProject()
			.then(function(project) {
				$scope.latestProject = project._id;
				console.log("project created");
				user.projects.push(project._id)
				return UserFactory.updateUser(user._id, user)
			})
			.then(function(returnedUser) {
				console.log("this worked");
				$scope.user = user = returnedUser;
				$state.go('userDash.project', ({
					id: user._id,
					projectId: $scope.latestProject
				}))
			})
	}
	console.log("USER", user);
})