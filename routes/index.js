const { verify } = require("../jwtverify/verify");
const {register, login,logout,addTransaction, updateTransaction} = require("../modules/index");
const route = (app) => {
    app.post("/register", register);
    app.post("/login",login);
    app.post("/add-transaction",verify,addTransaction)
    app.put("/update-transaction/:_id",updateTransaction)
    app.post("/logout",verify,logout);
    app.get("/post",verify,(req,res) => {
        res.send("welcome")
    })
}

module.exports = route;

