const router = require("express").Router();
const { loginUser, refreshToken, registerUser, logoutUser } = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/logout",logoutUser)
router.post("/refreshToken", refreshToken);
router.post("/register", registerUser);

module.exports = router;
