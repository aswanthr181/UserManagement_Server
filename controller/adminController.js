const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const authToken=require('../middleware/auth')
const adminModel=require("../models/adminSchema")
const userModel=require('../models/userSchema')

const adminLogin = async (req, res, next) => {
    try {

        console.log("first")
        let adminResult = {
            Status: false,
            message: null,
            token: null,
        };
        let adminDetails = req.body;
        const admin = await adminModel.findOne({ email: adminDetails.email });
        if (admin) {
            if (admin.password === adminDetails.password) {
                const token = authToken.adminToken(admin);
                adminResult.Status = true;
                adminResult.token = token;
                res.json({ adminResult });
            } else {
                adminResult.message = "Your Password not matched";
                res.json({ adminResult });
            }
        } else {
            adminResult.message = "Your email is wrong";
            res.json({ adminResult });
        }
    } catch (error) {
        console.log(error);
    }   
}

const isAdminAuth = async (req, res, next) => {
    try {
        const admin = await adminModel.findById(req.adminId);
        console.log(req.adminId);
        const adminDetails = { email: admin.email };
        res.json({ auth: true, result: adminDetails, status: "success", message: "signIn success" });
    } catch (error) {
        console.log(error);
        res.json({ status: "failed", message: error.message });
    }
}

const  getUser = async (req, res, next) => {
    try {
        console.log("first")
        const users = await userModel.find({});
        res.json({ status: "success", result: users });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

const userEdit = async (req, res, next) => {
    try {
        const id = req.query.id;
        const findUser = await userModel.findById(id);
        res.json({ result: findUser });
    } catch (error) {
        console.log(error);
    }
};

const blockUser = async (req, res, next) => {
    try {
        await userModel.findByIdAndUpdate(id, { isBanned: true });
        const users = await userModel.find({});
        res.json({ status: "success", result: users });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await userModel.deleteOne({ _id: req.body.id });
        const users = await userModel.find({});
        res.json({ status: "success", result: users });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
        console.log(error);
    }
};

const editUser = async (req, res, next) => {
    try {
        let userDetails = req.body;
        console.log(req.body, 232);
        const id = req.body.id;
        await userModel.updateOne({ _id: id }, { $set: { name: userDetails.name, phone: userDetails.phone } });
        res.json({ status: "success" });
    } catch (error) {
        console.log(error.message);
        res.json({ status: "failed", message: error.message });
    }
};




module.exports={
    adminLogin,
    isAdminAuth,
    getUser,
    deleteUser,
    blockUser,
    userEdit,
    editUser
}