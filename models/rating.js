const mongoose=require('mongoose');

const ratingschema=mongoose.Schema({
   userid:{
    type:String,
    required: true,
   },
   rating:{
    type:Number,
    required:true,
   }




});

module.exports=ratingschema;