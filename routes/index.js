const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index", { title: "Home" });
});

const books = require("./books");
const employees = require("./employees");
const members = require("./members");
const transactions = require("./transactions");

router.use("/books", books);
router.use("/employees", employees);
router.use("/members", members);
router.use("/transactions", transactions);

module.exports = router;
