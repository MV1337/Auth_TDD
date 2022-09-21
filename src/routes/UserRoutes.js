const express = require("express");
const router = express.Router();

//middlewares
const { registerValidation } = require("../middlewares/userValidations");
const validate = require("../middlewares/handleValidation");

//controller
const { register, deleteUser, login } = require("../controller/UserController");

router.post("/register", registerValidation(), validate, register);
router.post("/login", login)
router.delete("/:email", deleteUser);

module.exports = router;
