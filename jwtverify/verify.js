const jwt =require("jsonwebtoken");


exports.verify = async(req,res,next) => {
    const token =req.headers.authorization.split(' ')[1]
    console.log(process.env.SECRET);
    // if(!token) return res.status(400).send("Access Denied");
    try{
    const decode = jwt.verify(token,process.env.SECRET)
    console.log("raman");
    console.log(decode);
    req.user = decode;
    next()
    }
    catch(err){
        res.status(400).send("Authentication Failed");
    }

}