'use strict';

const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');

const User = require('../models/User');

let localStrategy = (username, password, done) => {
    User.findOne({ username: username }, (err, userData) => {
        if (err) 
            return done(err); 

        if (userData) 
            bcrypt.compare(password, userData.password, (errH, resH) => {
                if (resH) 
                    return done(null, userData);
                else 
                    return done(null, false, { auth_error: true, message: 'Incorrect password' });
            });
        else 
            return done(null, false, { auth_error: true, message: 'Incorrect username' });
    });
};

module.exports = (app) => {

    app.use(passport.initialize());
    //app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, (err, userData) => {
            if (err) {
                return done(null, {
                    message: 'Error getting user',
                    error: err
                });
            }

            if (!userData) {
                return done(null, {
                    message: 'The user does not exist'
                });
            }
            
            return done(null, userData);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, localStrategy ));

};
