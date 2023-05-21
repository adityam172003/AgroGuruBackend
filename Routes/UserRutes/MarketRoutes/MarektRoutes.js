const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')

const {
    addMarket, getMarket,removeMarket, updataMarket, addItems, getmarketbyId, userMarket
} = require("../../../Controllers/MarketController/Market")

const uploadMiddleware = require("../../../Middleware/AdminMiddleware/MulterMiddleware");


const marketRouter = express();


marketRouter.post('/register',uploadMiddleware.single("marketImage"),Authentication,addMarket);
marketRouter.get('/getmarket',Authentication,getMarket);
marketRouter.get('/remove',Authentication,removeMarket);
marketRouter.patch('/marketup',Authentication,updataMarket);
marketRouter.post('/additems',Authentication,addItems);


// in this api sent market id by query parameters 
marketRouter.get('/marketbyid',getmarketbyId);

marketRouter.get('/usermarket', Authentication,userMarket);


// one api for array of items which contain object of itemname: and itemimage


module.exports = marketRouter 

