
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:true
    },
    isLogin: {
        type: Boolean,
        default: false
    },

},{timestamps:true})
module.exports = mongoose.model("User",userSchema);