const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index", { title: "Home" });
});

const books = require("./books");
const users = require("./users");
const transactions = require("./transactions");

router.use("/books", books);
router.use("/users", users);
router.use("/transactions", transactions);

module.exports = router;
