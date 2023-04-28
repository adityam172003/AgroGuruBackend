const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')

const {
    addNursery, getNursery
} = require("../../../Controllers/nurseryController/Nursery")



const nurseryRouter = express();


nurseryRouter.post('/register',Authentication,addNursery);
nurseryRouter.get('/getnursery',Authentication,getNursery)

module.exports = nurseryRouter

