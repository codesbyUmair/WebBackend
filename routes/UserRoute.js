const { createUser,  loginUser} = require("../controllers/UserController")
const express = require("express");

const router = express.Router();
router.post("/login" , loginUser )
router.post("/user", createUser);


module.exports = router;
