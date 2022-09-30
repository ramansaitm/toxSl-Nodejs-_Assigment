const joi = require("@hapi/joi");
exports.RegisterValidation = (data) => {
    const schema = {
        name:joi.string().min(4).required(),
        email:joi.string().required().email(),
        password:joi.string().min(8).required(),
        phone:joi.number().min(8).required(),
    }
    return joi.validate(data,schema);
    
}

exports.LoginValidation = (data) => {
    const schema = {
       
        email:joi.string().required().email(),
        password:joi.string().min(8).required(),
        
    }
    return joi.validate(data,schema);
    
}