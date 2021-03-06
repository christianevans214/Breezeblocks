'use strict';

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function(app) {

    var githubConfig = app.getValue('env').GITHUB;

    var githubCredentials = {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL
    };
    var currentUser;
    var verifyCallback = function(accessToken, refreshToken, profile, done) {

        UserModel.findOne({
                'github.id': profile.id
            }).exec()
            .then(function(user) {
                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        github: {
                            id: profile.id,
                            displayName: profile.displayName,
                            username: profile.username,
                            profileUrl: profile.profileUrl,
                            avatar: profile._json.avatar_url,
                            token: accessToken
                        }
                    });
                }
            }).then(function(userToLogin) {
                currentUser = userToLogin;
                done(null, userToLogin);
            }, function(err) {
                console.error('Error creating user from Github authentication', err);
                done(err);
            });

    };

    passport.use(new GithubStrategy(githubCredentials, verifyCallback));

    app.get('/auth/github', passport.authenticate('github', {
        scope: ['user', 'public_repo']
    }));

    app.get('/auth/github/callback',
        passport.authenticate('github', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            res.redirect('/' + currentUser._id);
        });

};