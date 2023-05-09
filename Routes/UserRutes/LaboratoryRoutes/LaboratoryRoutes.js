const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')

const {
    addLab, getLab,removeLab, updataLab, ItemsImageuploadsLab
} = require("../../../Controllers/laboratoryController/Lab");
const uploadMiddleware = require("../../../Middleware/AdminMiddleware/MulterMiddleware");



const labRouter = express();


labRouter.post('/register',Authentication,uploadMiddleware.single("laboratoryImage"),addLab);
labRouter.get('/getmarket' ,Authentication,getLab);
labRouter.get('/remove'    ,Authentication,removeLab);
labRouter.patch('/labup',Authentication,updataLab);
labRouter.post('/itemadd',Authentication,uploadMiddleware.single('photo'),ItemsImageuploadsLab)


// one api for array of items which contain object of itemname: and itemimage


module.exports = labRouter 

