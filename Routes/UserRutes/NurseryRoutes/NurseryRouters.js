const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')
const uploadMiddleware = require("../../../Middleware/AdminMiddleware/MulterMiddleware")
const {
    addNursery, getNursery,removeNursery, updataNursery, ItemsImageuploads
} = require("../../../Controllers/nurseryController/Nursery")



const nurseryRouter = express();


nurseryRouter.post('/register',Authentication,uploadMiddleware.single("nurseryImage"),addNursery);
nurseryRouter.get('/getnursery',Authentication,getNursery);
nurseryRouter.get('/remove',Authentication,removeNursery);
nurseryRouter.patch('/nurseryup',Authentication,updataNursery);
nurseryRouter.post('/itemadd',Authentication,uploadMiddleware.single("photo"),ItemsImageuploads);

// one api for array of items which contain object of itemname: and itemimage


module.exports = nurseryRouter 

