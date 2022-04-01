const jwt = require("jsonwebtoken");


exports.verify = (req,res,next) => {
    const token = req.cookies.auth;
    if(!token) return res.status(400).send("Access Denied");
    try{
    const decode = jwt.verify(token,process.env.SECRET)
    req.user = decode;
    next()
    }
    catch(err){
        res.status(400).send("Authentication Failed");
    }

}