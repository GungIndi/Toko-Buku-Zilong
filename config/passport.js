const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
      // Match user
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'That username is not registered' });
          }
          
          // Check isActive status
          if (user.isActive === 'Active') {
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { alertMessage: 'Incorrect password' , alertStatus : "danger"});
              }
            });
          } else {
            return done(null, false, { error_msg: 'User account is not active' });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};
