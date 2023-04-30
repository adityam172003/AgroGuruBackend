const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')

const {
    addMarket, getMarket,removeMarket, updataMarket
} = require("../../../Controllers/MarketController/Market")



const marketRouter = express();


marketRouter.post('/register',Authentication,addMarket);
marketRouter.get('/getmarket',Authentication,getMarket);
marketRouter.get('/remove',Authentication,removeMarket);
marketRouter.patch('/marketup',Authentication,updataMarket);


// one api for array of items which contain object of itemname: and itemimage


module.exports = marketRouter 

