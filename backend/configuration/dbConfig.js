const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/myabnotes_db");

mongoose.connection.on('connected',()=>{
    console.log("Mongoose is connected");
});

mongoose.connection.on('error',(err)=>{
    console.log("Mongoose connection error:", err);
});

module.exports=mongoose;