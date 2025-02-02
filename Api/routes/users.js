const express = require("express");
const router = express.Router();
const {
  getUserController,
  updateUserController,
  buyCredit,
} = require("../controllers/userController");

router.get("/:userId", getUserController);

router.put("/update/:userId", updateUserController);

router.put("/credit/:userId", buyCredit);

module.exports = router;
