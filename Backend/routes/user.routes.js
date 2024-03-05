const express = require('express')

const router = express.Router()
const { 
    getUserByPhone,
    sendOTP,
    uploadAvatar
} = require('../controllers/user.controller')
const { protect, isRootUser} = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multerMiddleware')

//get methods
router.get("/get/:phone",protect,isRootUser,getUserByPhone)

//post methods
router.post('/otp/send', sendOTP)
router.post('/upload-avatar',protect,upload.single("user-avatar"), uploadAvatar)


module.exports = router
