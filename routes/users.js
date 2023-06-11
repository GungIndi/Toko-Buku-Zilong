var router = require("express").Router();
const ensureAuthenticated = require("../config/requireAuth.js");

const userController= require("../controllers/userController");

router.get("/",ensureAuthenticated.ensureAuthenticatedAdmin, userController.viewUser);
router.post("/",ensureAuthenticated.ensureAuthenticatedAdmin, userController.addUser);
router.put("/:id",ensureAuthenticated.ensureAuthenticatedAdmin, userController.updateUser);
router.delete("/:id", ensureAuthenticated.ensureAuthenticatedAdmin,userController.deleteUser);

module.exports = router;
