var router = require("express").Router();
const ensureAuthenticated = require("../config/requireAuth.js");
const transactionController= require("../controllers/transactionController");

router.get("/",ensureAuthenticated.ensureAuthenticated, transactionController.viewTransaction);
router.post("/",ensureAuthenticated.ensureAuthenticated, transactionController.addTransaction);
// router.put("/:id",ensureAuthenticated.ensureAuthenticated, transactionController.updateTransaction);
router.delete("/:id",ensureAuthenticated.ensureAuthenticated, transactionController.deleteTransaction);

module.exports = router;