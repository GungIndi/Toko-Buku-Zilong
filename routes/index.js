const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../config/requireAuth.js");

router.get('/',ensureAuthenticated.ensureAuthenticated,(req, res) => {
    console.log(req.user.userType);
    res.render('index',{
        user: req.user,
        title: "HOME",
        userType: req.user.userType,
        name: req.user.name
        });
}); 

const auth = require("./auth");
const books = require("./books");
const users = require("./users");
const transactions = require("./transactions");
const report = require("./report");

router.use("/", auth);
router.use("/books", books);
router.use("/users", users);
router.use("/transactions", transactions);
router.use("/report", report);

module.exports = router;
