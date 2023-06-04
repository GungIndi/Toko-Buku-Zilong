const express = require("express");
const router = express.Router();

const booksController = require("../controllers/bookController");
// router.get("/books", function (req, res, next) {
//     res.render("books", { title: "Books" });
// });

router.get("/books",booksController.viewBooks);
router.post("/books", booksController.addBooks);
module.exports = router;
