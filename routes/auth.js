const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require("../models/User");

//login handle
router.get('/login',(req,res)=>{
    res.render('login',{
        title: "Login"
        });
    
})
router.get('/register',(req,res)=>{
    res.render('register',{
        title: "Register"
        });
    })

//Register handle
router.post('/register',(req,res)=>{
    const {name,address, phone, email, isActive, userType, username, password} = req.body;
    let errors = 0;
    console.log(' Name ' + name+ ' address ' + address+ ' phone ' + phone+ ' email :' + email+ ' isActive ' + isActive+ ' userType ' + userType+ ' username ' + username+' pass:' + password);
    if(!name || !address || !phone || !email || !isActive || !userType || !username || !password) {
        req.flash("alertMessage", "Please fill in all fields");
        req.flash("alertStatus", "danger");
        res.render('register', {
            // errors : errors,
            name : name,
            address : address,
            phone : phone,
            email : email,
            isActive : isActive,
            userType : userType,
            username : username,
            password : password,
            title: "Register"});
        errors++;
    }
    console.log(errors);
    if(password.length < 6 && errors == 0 ) {
        req.flash("alertMessage", "Password atleast 6 characters");
        req.flash("alertStatus", "danger");
        res.render('register', {
            // errors : errors,
            name : name,
            address : address,
            phone : phone,
            email : email,
            isActive : isActive,
            userType : userType,
            username : username,
            password : password,
            title: "Register"});
        errors++;
    }
    //check if password is more than 6 characters
    const newUser = new User({
        name : name,
        address : address,
        phone : phone,
        email : email,
        isActive : isActive,
        userType : userType,
        username : username,
        password : password
    });

    //hash password
    bcrypt.genSalt(10,(err,salt)=> 
    bcrypt.hash(newUser.password,salt,
        (err,hash)=> {
            if(err) throw err;
                //save pass to hash
                newUser.password = hash;
            //save user
            newUser.save()
            .then((value)=>{
                console.log(value);
                req.flash("alertMessage", "You have now registered!");
                req.flash("alertStatus", "success");
                res.redirect('/login');
            })
            .catch(value=> console.log(value));
              
        }));
});



router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
    successRedirect : '/',
    failureFlash : true,
    failureRedirect : '/login',
    })(req,res,next);
  })

//logout
router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("alertMessage", "You have now Logged Out!");
        req.flash("alertStatus", "success");
        res.redirect('/login');
      });
 });

module.exports  = router;