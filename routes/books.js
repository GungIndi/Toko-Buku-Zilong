var router = require("express").Router();
const ensureAuthenticated = require("../config/requireAuth.js");

const bookController= require("../controllers/bookController");

router.get("/",ensureAuthenticated.ensureAuthenticated, bookController.viewBooks);
router.post("/",ensureAuthenticated.ensureAuthenticated, bookController.addBooks);
router.put("/:id",ensureAuthenticated.ensureAuthenticated, bookController.updateBooks);
router.delete("/:id",ensureAuthenticated.ensureAuthenticated, bookController.deleteBook);

module.exports = router;
