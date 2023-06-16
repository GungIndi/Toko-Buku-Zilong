module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log("dari auth", req.user.userType);
      return next();
    }
    req.flash("alertMessage", "please login to view this resource");
    req.flash("alertStatus", "danger");
    res.redirect("/login");
  },
  ensureAuthenticatedAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.userType === "Admin") {
      if(req.user.isActive === "Active"){
        return next();
      }else{
        req.flash("alertMessage", "You're Account is Not Active");
        req.flash("alertStatus", "danger");
      }
    }
    req.flash("alertMessage", "You're Not The Admin");
    req.flash("alertStatus", "danger");
    res.redirect("/login");
  }
};
