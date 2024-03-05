const express = require('express')
const cookieParser = require('cookie-parser')

const router = express.Router()
const { 
    registerUser,
    loginUser,
    getAllUsers,
    getUserByPhone,
    sendOTP,
    uploadAvatar
} = require('../controllers/userController')
const { protect} = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multerMiddleware')

router.use(cookieParser())
//get methods
router.get("/get-all-users",protect,getAllUsers)
router.get("/get/:phone",getUserByPhone)

//post methods
router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/otp/send', sendOTP)
// router.post('/upload-avatar',protect,upload.single("user-avatar"), uploadAvatar)


module.exports = router
