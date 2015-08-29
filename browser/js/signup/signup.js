app.config(function($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function($scope, AuthService, $state) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function(signupInfo) {

        $scope.error = null;

        AuthService.signup(signupInfo).then(function() {
                return AuthService.getLoggedInUser()
            })
            .then(function(user) {
                console.log("SIGNUP USER", user);
                $state.go('userDash', {
                    id: user._id
                });
            })
            .catch(function() {
                $scope.error = 'Invalid login credentials.';
            });
    };

});