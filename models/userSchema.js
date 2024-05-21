const mongoose = require("mongoose");
 
const usersSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: [6],
    },
    image: {
        type: String,
    },
    isBanned: { type: Boolean, default: false },
},
{
    timestamps: true,
}

)

const userModel=mongoose.model("users",usersSchema)

module.exports=userModel