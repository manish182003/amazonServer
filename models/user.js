const mongoose=require('mongoose');
const { productschema } = require('./product');

const userschema=mongoose.Schema({
 name:{
    required: true,
    type:String,
    trim: true,

},
email:{
    required: true,
    type:String,
    trim: true,
    validate:{
        validator:(value)=>{
            const re=  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return value.match(re);
    
        },
        message: 'Please Enter a Valid Email Address',
    }
},
password:{
    required:true,
    type: String,
   
},
address:{
    type:String,
    default: '',
},
type:{
    type:String,
    default:'user'
},
cart:[
  {
    product:productschema,
    quantity:{
        type: Number,
        required:true,
    }
  }



]

});
const user=mongoose.model('user',userschema);
module.exports=user;



