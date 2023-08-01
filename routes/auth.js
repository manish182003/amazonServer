const express=require('express');
const user = require('../models/user');
const bcryptjs=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth = require('../middlewares/auth');
const authrouter=express.Router();

//sign up 
authrouter.post('/api/signup', async (req,res)=>{
    try{
        const {name,email,password}= req.body;

        const existinguser= await user.findOne({ email });
        const smallpassword=await user.findOne({password});
        if(existinguser){
            return res.status(400).json({msg:'User with same email already exists!'});
        }
        // if(smallpassword){
        //     return res.status(402).json({msg:'Password is less then 6 characters'});
        // }
     const hashedpassword = await  bcryptjs.hash(password,8);
        
        let User=new user({
          email,
          password:hashedpassword,
          name
        
        })
        User=await User.save();
        res.json({User});
        
        
        
    } catch(e){
        res.status(500).json({error: e.message});
    }
  

});

//sign in route


authrouter.post('/api/signin',async (req,res)=>{
   try{
    const  {email,password}=req.body;
    const User=await user.findOne({email});
if(!User){
  return res.status(400).json({msg: 'User with this email does not Exists!'});
}
const ismatch= await bcryptjs.compare(password,User.password);

if(!ismatch){
    return res.status(400).json({msg: 'Incorrect Password'});
}
const token= jwt.sign({id: User._id},"passwordkey");
res.json({token,...User._doc});




   }catch(e){
res.status(500).json({error:req.message});

   }




});

//api for validating data
authrouter.post('/tokenisvalid',async (req,res)=>{
    try{
     const token=req.header('x-auth-token');
     if(!token)
     return res.json(false);
    const verified= jwt.verify(token,'passwordkey');
     if(!verified){
        res.json(false);
     }
 
  const User=await user.findById(verified.id);
  if(!User)
  return res.json(false);

  res.json(true);
 
 
    }catch(e){
 res.status(500).json({error:req.message});
 
    }

 
 });


//api for getting user data

authrouter.get('/',auth,async(req,res)=>{
const User=await user.findById(req.user);
res.json({...User._doc,token:req.token});



})


module.exports=authrouter;