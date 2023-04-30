const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')

const {
    addLab, getLab,removeLab, updataLab
} = require("../../../Controllers/laboratoryController/Lab")



const labRouter = express();


labRouter.post('/register' ,Authentication,addLab);
labRouter.get('/getmarket' ,Authentication,getLab);
labRouter.get('/remove'    ,Authentication,removeLab);
labRouter.patch('/labup',Authentication,updataLab);


// one api for array of items which contain object of itemname: and itemimage


module.exports = labRouter 

