const express=require('express');
const auth = require('../middlewares/auth');
const { Product } = require('../models/product');
const user = require('../models/user');
const Order = require('../models/order');
const userrouter=express.Router();

userrouter.post('/api/add-to-cart',auth, async (req,res)=>{
  
    try{
     const {id}=req.body;
     const product=await Product.findById(id);
     let User=await user.findById(req.user);
     if(User.cart.length==0){
      User.cart.push({product,quantity: 1});


     }else{
        let isproductfound=false;
      for(let i=0;i<User.cart.length;i++){
        if(User.cart[i].product._id.equals(product._id)){
              isproductfound=true;
        }


      }

      if(isproductfound){
        let producttt=User.cart.find((productt)=>
        productt.product._id.equals(product._id)
        );
        
        producttt.quantity+=1;

      }else{
        User.cart.push({product,quantity: 1});
      }

     }
     User=await User.save();
     res.json(User);
      
        
    }catch(e){
    res.status(500).json({error: e.message});
    
    }
    
    
    });

    userrouter.delete('/api/remove-from-cart/:id',auth, async (req,res)=>{
  
      try{
       const {id}=req.params;
       const product=await Product.findById(id);
       let User=await user.findById(req.user);
      
        for(let i=0;i<User.cart.length;i++){
          if(User.cart[i].product._id.equals(product._id)){
           if(User.cart[i].quantity==1){
            User.cart.splice(i,1);
           }else{
            User.cart[i].quantity -=1;
           }
      
          }
  
  
        }
  
       
       
       User=await User.save();
       res.json(User);
        
          
      }catch(e){
      res.status(500).json({error: e.message});
      
      }
      
      
      });

      userrouter.post('/api/save-user-address',auth,async(req,res)=>{
       

        try{
        const {address}=req.body;
        let User=await user.findById(req.user);
        
        User.address=address;
        User=await User.save();
        res.json(User);



        }catch(e){
          res.status(500).json({error: e.message});
        }




      });


      //ordering product

      userrouter.post('/api/order',auth,async(req,res)=>{
       

        try{
        const {cart,totalPrice,address}=req.body;
         let products=[]

      for(let i=0;i<cart.length;i++){
      let product=await Product.findById(cart[i].product._id);
      if(product.quantity>=cart[i].quantity){
        product.quantity-=cart[i].quantity;
        products.push({product,quantity : cart[i].quantity})
        await product.save()
      }else{
        return res.status(400).json({msg: `${product.name} is out of stock`});
      }


      }

      let User=await user.findById(req.user);
      User.cart=[];
      User=await User.save();


      let order=new Order({
        products,
        totalPrice,
        address,
        userid:req.user,
        orderat:new Date().getTime(),
      })
      order=await order.save();
      res.json(order);
     
        



        }catch(e){
          res.status(500).json({error: e.message});
        }




      });

      userrouter.get('/api/order/me',auth,async(req,res)=>{
        
        try{
         const orderss=await Order.find({userid: req.user});
         res.json(orderss);


        }catch(e){
         res.status(500).json({msg: e.message});
        }


      });

    module.exports=userrouter;