var router = require("express").Router();

const userController= require("../controllers/userController");

router.get("/",userController.viewUser);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
