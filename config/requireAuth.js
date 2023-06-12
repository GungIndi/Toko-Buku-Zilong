module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log("dari auth", req.user.userType);
      return next();
    }
    req.flash("error_msg", "please login to view this resource");
    res.redirect("/login");
  },
  ensureAuthenticatedAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.userType === "Admin" && req.user.isActive === "Active") {
      return next();
    }
    req.flash("error_msg", "You're Not Admin!");
    res.redirect("/login");
  }
};
