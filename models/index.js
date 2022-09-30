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
    phone:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        default:[]
    },

},{timestamps:true})
module.exports = mongoose.model("User",userSchema);