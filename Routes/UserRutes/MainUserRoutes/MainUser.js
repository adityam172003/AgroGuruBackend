const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')

const {
    userResister,
    userLogin,
    userLogout,
    getUser
} = require('../../../Controllers/userController/UserLoginRegister');
const userRouter= express();
 


userRouter.post('/register',userResister);


userRouter.post('/login',userLogin);


// userRouter.put('/updateprofile',Authentication,userProfileUpdate)


userRouter.get('/logout',Authentication,userLogout);

userRouter.get('/getuser',Authentication,getUser);

module.exports = userRouter