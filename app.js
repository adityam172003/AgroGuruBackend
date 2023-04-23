require('./DB/Connect');


const express = require("express");
const cookieparser = require('cookie-parser')
const app     = express();

app.use(express.json())
app.use(cookieparser())

const dotenv=require("dotenv");
dotenv.config();
const Port = process.env.PORT;


// importing routes
const userRouter  = require("./Routes/UserRutes/MainUserRoutes/MainUser");

app.get("/",(req,res)=>{
    res.send("from express server ")

})


app.use("/user",userRouter);


app.listen( Port , ()=>{
    console.log("server is running on port number ",Port)
})
