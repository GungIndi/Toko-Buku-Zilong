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
    let errors = [];
    console.log(' Name ' + name+ ' address ' + address+ ' phone ' + phone+ ' email :' + email+ ' isActive ' + isActive+ ' userType ' + userType+ ' username ' + username+' pass:' + password);
    if(!name || !address || !phone || !email || !isActive || !userType || !username || !password) {
        errors.push({msg : "Please fill in all fields"})
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        address : address,
        phone : phone,
        email : email,
        isActive : isActive,
        userType : userType,
        username : username,
        password : password})
     } else {

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
                    console.log(value)
                    req.flash('success_msg','You have now registered!');
                    res.redirect('/login');
                })
                .catch(value=> console.log(value));
                  
            }));
        }
    });



router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true,
    })(req,res,next);
  })

//logout
router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg','Now logged out');
        res.redirect('/login');
      });
 });

module.exports  = router;