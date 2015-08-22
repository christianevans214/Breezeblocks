app.config(function($stateProvider) {
	$stateProvider
		.state("userDash", {
			url: "/:id",
			templateUrl: "js/user-dash/user-dash.html",
			controller: 'UserDashController',
			resolve: {
				user: function($stateParams, UserFactory) {
					return UserFactory.getUser($stateParams.id);
				}
			}
		});
});

app.controller("UserDashController", function($scope, user) {
	$scope.user = user;
	console.log("CONTROLLER USER", user);
})