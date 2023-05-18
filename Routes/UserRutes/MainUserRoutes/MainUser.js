const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')
const uploadMiddleware = require("../../../Middleware/AdminMiddleware/MulterMiddleware")
const {
    userResister,
    userLogin,
    userLogout,
    getUser,
    adddp
} = require('../../../Controllers/userController/UserLoginRegister');
const userRouter= express();
 


userRouter.post('/register',userResister);


userRouter.post('/login',userLogin);

userRouter.post('/dp',Authentication,uploadMiddleware.single("profilepic"),adddp)
// userRouter.put('/updateprofile',Authentication,userProfileUpdate)


userRouter.get('/logout',Authentication,userLogout);

userRouter.get('/getuser',Authentication,getUser);

module.exports = userRouter