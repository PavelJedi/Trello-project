const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const authentication = require("../middlewares/authentication");

router.post("/registration", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/me", authentication, AuthController.getCurrentUser);
router.get("/logout", AuthController.getCurrentUser);

module.exports = router;
