const passport = require('passport');
const User = require('../../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        User.findByUserName(username)
        .then(user => {
            return done(null, user);
        }).catch(err => {
            return done(err, null);
        });

    });

};