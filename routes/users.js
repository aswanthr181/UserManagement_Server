const express= require('express')
const router=express.Router()
const userController=require('../controller/usersController')
const auth=require("../middleware/auth")


router.post('/signUp',userController.SignUp)
router.post('/login',userController.Login)
router.get('/getDetails',auth.verifyToken,userController.getDetails)
router.get('/user_profile',auth.verifyToken,userController.userProfile)
router.post("/user_edit", auth.verifyToken, userController.userEdit);

module.exports=router