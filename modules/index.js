const User = require("../models/index");
 const bcrypt = require("bcrypt");
const {RegisterValidation,LoginValidation} = require("../validation/index");
const jwt = require("jsonwebtoken");

 exports.register = async (req, res) => {

    const {error} = RegisterValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send("Email is already exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);

    //checking requesting file
    const files =req.files
     console.log(files);
    if (!files) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
    }
    const imageFile=files.map(files=>files.path)
    const user = await new User({
    name:req.body.name,
    email:req.body.email,
    password: hashedPass,
    phone:req.body.phone,
    image:imageFile
})
        try{
           const saveduser = await user.save().then(user => {
               res.json({"user added successfully":user})
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

    
    User.findOneAndUpdate({email:req.body.email}, {isLogin: true}, (err, data) => {
        if(err) console.log(err);
        else console.log("Successfully updated the isLogin");

    })
    
    const token = jwt.sign({_id:User.email},process.env.SECRET);
    res.status(200).json({
        message:"Succesfully Login",
        token
    })
    
}
exports.getUser=async (req,res)=>
{
    const user =await User.find({})
    res.status(200).send(user)
}
