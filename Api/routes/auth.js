const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  logoutController,
  refetchUserController,
} = require("../controllers/authController");

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/refetch", refetchUserController);

module.exports = router;
