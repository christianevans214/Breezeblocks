app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser()
            }
        }
    });
});

app.controller('homeCtrl', function($scope, $rootScope, AuthService, AUTH_EVENTS, user) {
    $scope.user = user || null;

    $scope.isLoggedIn = function() {
        return AuthService.isAuthenticated();
    };

    $scope.logout = function() {
        AuthService.logout().then(function() {
            $state.go('home');
        });
    };

    $scope.logout = function() {
        AuthService.logout().then(function() {
            $state.go('home');
        });
    };

    var setUser = function() {
        AuthService.getLoggedInUser().then(function(user) {
            $scope.user = user;
            console.log("NAVBAR USER", user);
        });
    };

    var removeUser = function() {
        $scope.user = null;
    };



    $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
})