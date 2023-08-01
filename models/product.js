
const mongoose=require('mongoose');
const ratingschema = require('./rating');


const productschema=mongoose.Schema({
name:{
  type: String,
  required: true,
  trim: true,
},

description:{
    type: String,
    required: true,
    trim: true,
},
images:[
{
    type: String,
  required: true,
},
],
quantity:{
    type: Number,
    required:true,
},
price:{
    type:Number,
    required:true,
},
category:{
    type: String,
    required:true,
},

ratings:[ratingschema],







});


const Product=mongoose.model('Product',productschema);
module.exports={Product,productschema};