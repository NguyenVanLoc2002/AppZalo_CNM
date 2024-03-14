const router = require("express").Router();
const { loginUser, refreshToken, registerUser, logoutUser } = require("../controllers/auth.controller");

router.post("/login", loginUser);
router.post("/logout",logoutUser)
router.post("/refreshToken", refreshToken);
router.post("/register", registerUser);

module.exports = router;
