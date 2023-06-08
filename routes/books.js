var router = require("express").Router();

const bookController= require("../controllers/bookController");

// router.get("/", function (req, res) {
//     res.render("books", { title: "Books" });
// });

router.get("/",bookController.viewBooks);
router.post("/", bookController.addBooks);
router.put("/", bookController.updateBooks);


module.exports = router;
