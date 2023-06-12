const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../config/requireAuth.js");

router.get('/',ensureAuthenticated.ensureAuthenticated,(req, res) => {
    console.log(req.user.userType);
    res.render('index',{
        user: req.user,
        title: "HOME",
        userType: req.user.userType
        });
}); 

// router.get('/dashboard',ensureAuthenticated,(req,res)=>{
//     res.render('dashboard',{
//     user: req.user
//     });
// });


const auth = require("./auth");
const books = require("./books");
const users = require("./users");
const transactions = require("./transactions");

router.use("/", auth);
router.use("/books", books);
router.use("/users", users);
router.use("/transactions", transactions);

module.exports = router;
