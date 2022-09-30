const { verify } = require("../jwtverify/verify");
const {register, login,getUser} = require("../modules/index");
const {upload} = require("../image_upload/index")

const route = (app) => {
    app.post("/register", upload.array('myFile'),register);
    app.post("/login",login);
    app.get("/user",verify,getUser)
}
module.exports = route;

