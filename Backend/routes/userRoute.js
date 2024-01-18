const express = require('express')

const router = express.Router()
const { 
    registerUser,
    loginUser,
    getAllUsers,
    getUserByPhone,
    sendOTP
} = require('../controllers/userController')
const { protect} = require('../middlewares/authMiddleware')

//get methods
router.get("/get-all-users",protect,getAllUsers)
router.get("/get/:phone",getUserByPhone)

//post methods
router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/otp/send', sendOTP)


module.exports = router
