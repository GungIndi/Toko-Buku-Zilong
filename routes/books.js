var router = require("express").Router();

const bookController= require("../controllers/bookController");

router.get("/",bookController.viewBooks);
router.post("/", bookController.addBooks);
router.put("/", bookController.updateBooks);
router.delete("/:title", bookController.deleteBook);

module.exports = router;
