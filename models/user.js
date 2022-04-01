
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true

    },
   amount:{
        type:Number,
        required:true
   },
   currency:{
    type:String,
    required:true
},
    description:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },




},{timestamps:true})
module.exports = mongoose.model("transact",userSchema);