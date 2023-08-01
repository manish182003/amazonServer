const mongoose=require('mongoose');
const { productschema } = require('./product');
const orderschema=mongoose.Schema({
products:[


    {
      product:productschema,
      quantity:{
        type:Number,
        required:true,
      },



    },

 
],
totalPrice:{
   type:Number,
   required:true


},
address:{
    type:String,
    required:true,
},
userid:{
   required:true,
   type:String,
},
orderat:{
   type:Number,
   required:true,

},
status:{
    type:Number,
    default:0,
}



});


const Order=mongoose.model('Order',orderschema);
module.exports=Order;