const Users = require("../models/User");
const bcrypt = require('bcrypt');

module.exports = {

  // GET
  viewUser: async (req, res) => {
    try {

      const users = await Users.find();
      
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("users", {
        users,
        alert,
        title: "USERS", 
        userType: req.user.userType,
        name: req.user.name
      });
      
    } catch (error) {
     
      res.redirect("/users");
    }
  },

  //  POST
  addUser: async (req, res) => {

    try {
      let { name, address,  phone, email, isActive, userType, username, password } = req.body;
      if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
      }
      //hash password
      bcrypt.genSalt(10,(err,salt)=> 
      bcrypt.hash(password,salt,
        (err,hash)=> {
          if(err) throw err;
          //save pass to hash
          password = hash;
          Users.create({ name, address, phone, email,  isActive, userType, username, password  });
          req.flash("alertMessage", "Success add data Users");
          req.flash("alertStatus", "success");
          res.redirect("/users");
      }));
    }catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/users");
    }
  },

  // PUT
  updateUser: async (req, res) => {
    try {
      const { password, ...rest } = req.body;
  
      if (password) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Update the user document with the hashed password
        const user = await Users.findOneAndUpdate(
          { _id: req.params.id },
          { ...rest, password: hashedPassword }
        );
      } else {
        // If no password is provided, update the user document without changing the password field
        const user = await Users.findOneAndUpdate(
          { _id: req.params.id },
          { ...rest }
        );
      }
      req.flash("alertMessage", "User Data Updated!!");
      req.flash("alertStatus", "success");
      res.redirect("/users");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/users");
    }
  },

  // DELETE
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await Users.deleteOne({ _id: id });
      req.flash("alertMessage", "User Deleted!!");
      req.flash("alertStatus", "warning");
      res.redirect("/users");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/users");
    }
  }
};
