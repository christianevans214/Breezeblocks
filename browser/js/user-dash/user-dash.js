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

app.controller("UserDashController", function($scope, $stateParams) {
	// $scope.user = user;
	console.log("USER STATEPARAMS", $stateParams);
})