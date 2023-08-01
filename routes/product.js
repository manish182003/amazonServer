const express=require('express');
const auth = require('../middlewares/auth');
const {Product} = require('../models/product');


const productrouter=express.Router();



productrouter.get('/api/products',auth,async (req,res)=>{

    try{
   
     const products= await Product.find({category: req.query.category});
     res.json(products);
    }catch(e){
       res.status(500).json({error: e.message});
    }
 
 });


 productrouter.get('/api/products/search/:name',auth,async (req,res)=>{

   try{
  
    const products= await Product.find({
     name: {$regex: req.params.name,$options: 'i'},
    });
    res.json(products);
   }catch(e){
      res.status(500).json({error: e.message});
   }

});


productrouter.post('/api/rate-product',auth,async(req,res)=>{

try{
const {id,rating}=req.body;
let product=await Product.findById(id);
for(let i=0;i<product.ratings.length;i++){
   if(product.ratings[i].userid==req.user){
     product.ratings.splice(i,1);
     break;
   }
}
ratingschema={
   userid:req.user,
   rating:rating,
}
product.ratings.push(ratingschema);
product=await product.save();
res.json(product);




}catch(e){
res.status(500).json({error: e.message});


}


});


productrouter.get('/api/deal-of-day',auth,async(req,res)=>{

try{
let products=await Product.find({});
  products = products.sort((a,b)=>{
let asum=0;
let bsum=0;

for(let i=0;i<a.ratings.length;i++){
asum+=a.ratings[i].rating;
}

for(let i=0;i<b.ratings.length;i++){
   bsum+=b.ratings[i].rating;
   }

   return asum<bsum ?1:-1;

});

res.json(products[0]);

}catch(e){
   res.status(500).json({error: e.message});
}



});




module.exports=productrouter;