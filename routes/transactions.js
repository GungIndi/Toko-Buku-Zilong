var router = require("express").Router();
const ensureAuthenticated = require("../config/requireAuth.js");
const transactionController= require("../controllers/transactionController");

router.get("/",ensureAuthenticated.ensureAuthenticatedAdmin, transactionController.viewTransaction);
router.post("/",ensureAuthenticated.ensureAuthenticatedAdmin, transactionController.addTransaction);
router.put("/:id",ensureAuthenticated.ensureAuthenticatedAdmin, transactionController.updateTransaction);
router.delete("/:id",ensureAuthenticated.ensureAuthenticatedAdmin, transactionController.deleteTransaction);

module.exports = router;