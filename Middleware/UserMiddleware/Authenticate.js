
const jwt=require('jsonwebtoken');
const user =require('../../Schema/UserSchema/CommonSchema/Userschema');




const Authentication= async (req,res,next)=>{
try{
    const token=req.cookies.jwtoken;
   
    
    
    const verifyToken = jwt.verify(token,process.env.JWT_PASS) ;
    
    const rootuser = await user.findOne({_id:verifyToken._id,"tokens.token":token});

    if(!rootuser){
        throw new Error("user not found")

    }
    req.token=token;
    req.rootuser=rootuser;

    req.rootuserId=rootuser._id;


    next();
     
}catch(err){
    console.log("in the backend catch")
    res.status(401).send('Unauthorized : Not Token provided')

    console.log(err);

}


}



module.exports= Authentication;