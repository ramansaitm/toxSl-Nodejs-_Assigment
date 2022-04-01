 
 const User = require("../models/index");
 const Transact = require("../models/user");
 const bcrypt = require("bcrypt");
 const cookieParser = require("cookie-parser");
const { genSalt } = require("bcrypt");
const {RegisterValidation,LoginValidation} = require("../validation/index");
const jwt = require("jsonwebtoken");
const { decode } = require("jsonwebtoken");
const dotenv = require("dotenv").config()

 exports.register = async (req, res) => {

    const {error} = RegisterValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send("Email is already exist");

    const salt = await genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);
    
    const user = await new User({
    name:req.body.name,
    email:req.body.email,
    password: hashedPass,
    address:req.body.address,
    profilePic:req.body.profilePic,
})
        try{
           const saveduser = await user.save().then(user => {
               res.json({user})
           })
       }
       catch(err) {
           res.status(400).send(err);
       }
}

exports.login = async (req,res) => {
    const {error} = LoginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const users = await User.findOne({email:req.body.email})
    if(!users) return res.status(400).send("Email is not valid");
    
    const pass = await bcrypt.compare(req.body.password,users.password);
    if(!pass) res.status(400).send("Password is Incorrect");

    const userdetails = User.findOne({_id:users._id}).then(userdetails => {
        const userid = userdetails._id.toString()
        //return userid;
        return userid
        
    })
    console.log(userdetails.userid)
    
    

    User.findOneAndUpdate({email:req.body.email}, {isLogin: true}, (err, data) => {
        if(err) console.log(err);
        else console.log("Successfully updated the isLogin");

    })
    
    const token = jwt.sign({_id:User._id},process.env.SECRET);
    res.cookie("auth",token,{httpOnly:true}).status(200).json({
        message:"Succesfully Login",
        token
    })
    
}
exports.logout = (req,res) => {
 res.clearCookie("auth").status(200).json({ message: "Successfully logged out 😏 🍀" });
    
    User.findOneAndUpdate({email:req.body.email}, {isLogin: false}, (err, data) => {
        if(err) console.log(err);
        else console.log("Successfully updated the isLogin", data);

    })
   

}
exports.addTransaction =  async (req,res) => {
  
    // const userdetails = User.findOne({_id:User._id})
    // const userId = userdetails._id.toString()
    const userdetails = User.findOne({_id:User._id})
    //console.log(myappuserid,"outside");
    
    const transaction = new Transact({
        userId:userdetails._id,
        amount:req.body.amount,

        currency:req.body.currency,
        description:req.body.description,
        title:req.body.title
    })
    try{
        const transact = await transaction.save().then(transaction => {
            res.json({transaction})
        })
    }catch(err){
        res.status(400).send(err);
    }


}
exports.updateTransaction = async(req,res) => {
    
    // const updateData = User.findByIdAndUpdate(req.params._id,{new:true},
    //     {$set: { amount:req.body.amount,
    //  currency:req.body.currency,
    //  description:req.body.description,
    //     title:req.body.title}}, 
    //     function(err,user){
    //     if(err){
    //         res.json({error :err}) ; 
    //     } else{
    //         res.send(user) ; 
    //     }
    //  });

    // try{

    
    // const saveduser = await updateData.save().then(() => {
    //     res.send("Data is Updatded")
    // })

    // }catch(err){
    //     res.status(400).send(err)
    // }
 

}
