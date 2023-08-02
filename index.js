//console.log("hello world");
// print ("hello world");
//import from package
const express = require('express');
const mongoose=require('mongoose');

//import 'package:express/express.dart'

//import from other files
const authrouter=require('./routes/auth');
const adminrouter=require('./routes/admin');
const productrouter = require('./routes/product');
const userrouter = require('./routes/user');

//init
const Port = 3000;
const app = express();
const db="mongodb+srv://manishjoshi182003:390113192875@cluster0.yxslajb.mongodb.net/?retryWrites=true&w=majority";

//middleware
//client -> middleware-> server->client
app.use(express.json())
app.use(authrouter);
app.use(adminrouter);
app.use(productrouter);
app.use(userrouter);



//connections
mongoose.connect(db).then(()=>{
    console.log('connection succesful')
}).catch((e) => {
    console.log(e);
})




//CREATING API
//http://<your ip adress>/hello world
// app.get("/hello-world", (req, res) => {
//     res.json({hi: 'hello world'});

// });

// app.get("/",(req,res)=>{
//   res.json({name:"Rivaan"});
// });
// get, put,post,delete,update -> crud


app.listen(Port,"0.0.0.0", () => {
    console.log(`connected at port ${Port} `);
}
)







