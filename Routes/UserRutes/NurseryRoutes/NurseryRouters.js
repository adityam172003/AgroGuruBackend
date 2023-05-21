const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')
const uploadMiddleware = require("../../../Middleware/AdminMiddleware/MulterMiddleware")
const {
    addNursery, getNursery,removeNursery, updataNursery, ItemsImageuploads, getnurserybyId, userNursery
} = require("../../../Controllers/nurseryController/Nursery")



const nurseryRouter = express();


nurseryRouter.post('/register',Authentication,uploadMiddleware.single("nurseryImage"),addNursery);
nurseryRouter.get('/getnursery',Authentication,getNursery);
nurseryRouter.get('/remove',Authentication,removeNursery);
nurseryRouter.patch('/nurseryup',Authentication,updataNursery);
nurseryRouter.post('/itemadd',Authentication,uploadMiddleware.single("photo"),ItemsImageuploads);

nurseryRouter.get('/getnurserybyid',getnurserybyId);  // id should be send by id


nurseryRouter.get('/usernursery',Authentication,userNursery)

module.exports = nurseryRouter 

