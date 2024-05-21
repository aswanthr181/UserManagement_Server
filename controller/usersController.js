
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const authToken=require('../middleware/auth')
const userModel=require("../models/userSchema")


 const SignUp=async(req,res,next)=>{
    try {
        
        let userdetails=req.body
        console.log(userdetails)
        const user=await userModel.find({email:userdetails.email})
        if(user.length===0){
            userdetails.password= await bcrypt.hash(userdetails.password,10)
            userModel.create({
                name:userdetails.name,
                email:userdetails.email,
                password:userdetails.password,
                phone:userdetails.phone,
            }).then((data)=>{
                console.log(data)
            }).catch((error)=>{
                console.log(error)
            })

            res.json({ status: true, result:userdetails});
    
        }else{
            return res.json({ error: "User already exists" });
        }
       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const Login=async(req,res,next)=>{
    console.log("first")
    let userSignUp={
        Status: false,
        message: null,
        token: null,
        name: null,
    }
    
    try {
        const userdetails=req.body
        console.log(userdetails)
        const findUser=await userModel.findOne({email:userdetails.email})
        if(findUser){
            const isMatch=await bcrypt.compare(userdetails.password,findUser.password)
            if(isMatch===true){
                const token=authToken.generateAuthToken(findUser)
                const name=findUser.name;
                userSignUp.message='You are logged'
                userSignUp.Status=true
                userSignUp.token = token;
                userSignUp.name = findUser.name;

                const obj = {
                    token,
                    name,
                };

                res.cookie("jwt", obj, {
                    httpOnly: false,
                    maxAge: 6000 * 1000,
                })
                    .status(200)
                    .send({ userSignUp });
            }else{
                userSignUp.message = " Password is wrong";
                userSignUp.Status = false;
                res.send({ userSignUp });
            }
        }else{
            userSignUp.message = " Email is wrong";
            userSignUp.Status = false;
            res.send({ userSignUp });
        }
    }catch (error) {
        res.json({ status: "failed", message: error.message });
    }
       
     
} 


const getDetails = async (req, res, next) => {
    console.log(req.user, "id");
    try {
        const user = await userModel.findById(req.user._id);
        console.log(user);

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            image: user.image || null,
        });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
}

const userProfile = async (req, res, next) => {
    console.log("jjjjjjjjjjjjjjjjjj")
    try {
        const id = req.user;
        console.log(req.user);
        console.log(id);
        let userDetails = await userModel.findOne({ _id: id._id });

        if (userDetails) {
            res.status(200).json({ data: userDetails });
        } else {
            res.status(500).send({ error: "no user" });
        }
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
}


const userEdit = async (req, res, next) => {
    const data = req.body;
    const id = req.user._id;
    try {
        await userModel.updateOne({ _id: id }, { $set: { name: data.name, phone: data.phone, image: data.photo } });
        res.json({ status: "success" });
    } catch (error) {
        console.log(error.message);
        res.json({ status: "failed", message: error.message });
    }
};



module.exports={
    SignUp,
    Login,
    getDetails,
    userProfile,
    userEdit
}