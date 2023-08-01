
const User = require('../models/user');

const jwt=require('jsonwebtoken');

admin =async (req,res,next)=>{

try{
token=req.header('x-auth-token');
if(!token){
    return res.status(401).json({msg: 'No auth token, access denied'});
}
verified=jwt.verify(token,'passwordkey');
if(!verified){
    res.status(401).json({msg: 'token verification failed, access denied'});
}
user=await User.findById(verified.id);
if(user.type=='user' || user.type=='seller'){
    return res.status(401).json({msg: 'You are not an admin'});
}
res.user=verified.id;
res.token=token;
next();

}catch(e){
    res.status(500).json({error: e.message});
}



};
module.exports=admin;