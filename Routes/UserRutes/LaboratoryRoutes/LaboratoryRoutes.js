const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')

const {
    addLab, getLab,removeLab, updataLab, ItemsImageuploadsLab, getlabbyId, userLab
} = require("../../../Controllers/laboratoryController/Lab");
const uploadMiddleware = require("../../../Middleware/AdminMiddleware/MulterMiddleware");



const labRouter = express();


labRouter.post('/register',Authentication,uploadMiddleware.single("laboratoryImage"),addLab);
labRouter.get('/getlaboratory' ,Authentication,getLab);
labRouter.get('/remove'    ,Authentication,removeLab);
labRouter.patch('/labup',Authentication,updataLab);
labRouter.post('/itemadd',Authentication,uploadMiddleware.single('photo'),ItemsImageuploadsLab)


// provid lab id by query parameters 
labRouter.get('/getlabbyid',getlabbyId);
// one api for array of items which contain object of itemname: and itemimage


labRouter.get('/userlab',Authentication,userLab);

module.exports = labRouter 

