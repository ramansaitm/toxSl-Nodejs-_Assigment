const express = require("express");
const route = require("./routes/index")
const {connectDB} = require("./dbConnect");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

app.use(morgan("dev"));
app.use(cookieParser())
app.use(express.json())
app.use('/uploads', express.static(__dirname +'/uploads'));
route(app);
const port=9000


//db connection
connectDB();

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})