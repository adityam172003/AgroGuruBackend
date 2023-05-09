require('./DB/Connect');


const express = require("express");
const cookieparser = require('cookie-parser')
const app     = express();
const cors = require('cors')
app.use(cors());
app.use(express.json())
app.use(cookieparser())

const dotenv=require("dotenv");
dotenv.config();
const Port = process.env.PORT;


// importing routes
const userRouter    = require("./Routes/UserRutes/MainUserRoutes/MainUser");
const nurseryRouter = require("./Routes/UserRutes/NurseryRoutes/NurseryRouters");
const marketRouter  = require("./Routes/UserRutes/MarketRoutes/MarektRoutes")
const labRouter     = require("./Routes/UserRutes/LaboratoryRoutes/LaboratoryRoutes")


app.get("/",(req,res)=>{
    res.send("from express server ")

})

app.use(express.static("public"));

app.use("/user",userRouter);
app.use("/nursery",nurseryRouter);
app.use("/market",marketRouter);
app.use("/lab",labRouter)




app.listen( Port , ()=>{
    console.log("server is running on port number ",Port)
})
