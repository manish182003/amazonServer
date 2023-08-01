const {Product} = require('../models/product');

const express=require('express');
const adminrouter=express.Router();
const admin=require('../middlewares/admin');
const Order = require('../models/order');
// add product
adminrouter.post('/admin/add-product',admin, async (req,res)=>{
  
try{
 const { name,description,images,quantity,price,category } = req.body;
 let product= new Product({
    name,
    description,
    
    quantity,
    images,
    
    category,
    price
 });
 product=await product.save();
 res.json(product);
    
}catch(e){
res.status(500).json({error: e.message});

}


});


//get all the products

adminrouter.get('/admin/get-products',admin,async (req,res)=>{

   try{
    const products= await Product.find();
    res.json(products);
   }catch(e){
      res.status(500).json({error: e.message});
   }



});


//delete the product

adminrouter.post('/admin/delete-product',admin,async(req,res)=>{

   try{
      const {id}=req.body;
      let product=await Product.findByIdAndDelete(id);
    
      res.json(product);
     }catch(e){
        res.status(500).json({error: e.message});
     }
  


});


adminrouter.get('/admin/get-orders',admin,async(req,res)=>{

try{
let order=await Order.find();
res.json(order);



}catch(e){
   res.status(500).json({error: e.message});
}

});


adminrouter.post('/admin/change-order-status',admin,async(req,res)=>{

try{
const {id,status}=req.body;
let order=await Order.findById(id);
order.status=status;
order=await order.save();
res.json(order);


}catch(e){
   res.status(500).json({error: e.message});
}



});
adminrouter.get('/admin/analytics',admin,async(req,res)=>{

try{
const orders=await Order.find();


let totalearning=0;

for(let i=0;i<orders.length;i++){
 for(let j=0;j<orders[i].products.length;j++){
   totalearning+=orders[i].products[j].quantity*orders[i].products[j].product.price;

 }

}

 let mobileearning=  await fetchcategoryviseproduct('Mobiles');
 let essentialearning=  await fetchcategoryviseproduct('Essentials');
 let applianceseearning=  await fetchcategoryviseproduct('Appliances');
 let booksearning=  await fetchcategoryviseproduct('Books');
 let fashionearning=  await fetchcategoryviseproduct('Fashion');

 let earnings={
   totalearning,
   mobileearning,
   essentialearning,
   applianceseearning,
   booksearning,
   fashionearning,
 }


res.json(earnings);


}catch(e){
   res.status(500).json({error: e.message});
}



});

async function fetchcategoryviseproduct(category){
   let earning=0;

  let categoryorder=await Order.find({
   'products.product.category':category,
  });


  for(let i=0;i<categoryorder.length;i++){
   for(let j=0;j<categoryorder[i].products.length;j++){
     earning+=categoryorder[i].products[j].quantity*categoryorder[i].products[j].product.price;
  
   }
  
  }
  return earning;
  

}

module.exports=adminrouter;