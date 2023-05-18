const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')

const {
    addMarket, getMarket,removeMarket, updataMarket, addItems
} = require("../../../Controllers/MarketController/Market")

const uploadMiddleware = require("../../../Middleware/AdminMiddleware/MulterMiddleware");


const marketRouter = express();


marketRouter.post('/register',uploadMiddleware.single("marketImage"),Authentication,addMarket);
marketRouter.get('/getmarket',Authentication,getMarket);
marketRouter.get('/remove',Authentication,removeMarket);
marketRouter.patch('/marketup',Authentication,updataMarket);
marketRouter.post('/additems',Authentication,addItems);

// one api for array of items which contain object of itemname: and itemimage


module.exports = marketRouter 

