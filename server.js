require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require("./api/users/user.router");
const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use("/api", userRouter);

// app.get("/api",(req,res)=>{
//     res.json({
//         succes:1,
//         message:"hello Everyone"

//     });
// });

app.listen(process.env.APP_PORT, () => {
    console.log("Running on port:", process.env.APP_PORT);
});