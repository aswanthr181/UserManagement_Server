const express= require('express')
const router=express.Router()
const adminController=require('../controller/adminController')
const auth=require("../middleware/auth")

router.post("/adminLogin", adminController.adminLogin);
router.get("/getUsers",auth.verifyToken,adminController.getUser);
router.get("/user_edit",auth.verifyToken, adminController.userEdit);
router.post("/edit_user_post",auth.verifyToken, adminController.editUser);
router.post("/delete_user",auth.verifyToken, adminController.deleteUser);

module.exports=router