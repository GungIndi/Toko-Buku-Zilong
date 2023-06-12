var router = require("express").Router();
const ensureAuthenticated = require("../config/requireAuth.js");

const bookController= require("../controllers/bookController");

router.get("/",ensureAuthenticated.ensureAuthenticated, bookController.viewBooks);
router.post("/",ensureAuthenticated.ensureAuthenticatedAdmin, bookController.addBooks);
router.put("/:id",ensureAuthenticated.ensureAuthenticatedAdmin, bookController.updateBooks);
router.delete("/:id",ensureAuthenticated.ensureAuthenticatedAdmin, bookController.deleteBook);

module.exports = router;
