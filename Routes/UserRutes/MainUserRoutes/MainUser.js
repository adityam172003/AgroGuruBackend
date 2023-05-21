const express= require("express")
const Authentication = require('../../../Middleware/UserMiddleware/Authenticate')
const uploadMiddleware = require("../../../Middleware/AdminMiddleware/MulterMiddleware")
const {
    userResister,
    userLogin,
    userLogout,
    getUser,
    adddp,
    userProfileUpdate
} = require('../../../Controllers/userController/UserLoginRegister');
const { cropPredictInfo, getHistory, marketvisit, Nurseryvisit, labvisit } = require("../../../Controllers/HistoryController");
const userRouter= express();
 


userRouter.post('/register',userResister);


userRouter.post('/login',userLogin);

userRouter.post('/dp',Authentication,uploadMiddleware.single("profilepic"),adddp)
 userRouter.put('/updateprofile',Authentication,userProfileUpdate);


userRouter.get('/logout',Authentication,userLogout);

userRouter.get('/getuser',Authentication,getUser);

userRouter.post('/crophistory',Authentication,cropPredictInfo);
userRouter.post('/markethistory',Authentication,marketvisit)
userRouter.post('/nurseryhistory',Authentication,Nurseryvisit);
userRouter.post('/labhistory',Authentication,labvisit); 

userRouter.get('/gethistory',Authentication,getHistory);

module.exports = userRouter