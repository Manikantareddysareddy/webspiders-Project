const express =require("express");
const dotenv =require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const app=express();
const Joi = require('joi');
const taskRouter = require('./routes/tasks'); // Import task routes
const{PORT,DB_USER,DB_PASSWORD}=process.env;
const dbURL=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.htqbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbURL).then(function(connection){
    console.log("Connection Succesful")
})

app.use(express.json())
// Use task routes
app.use('/api/tasks', taskRouter);

//404 route not found
app.use(function(req,res){
    res.status(404).json({
        status:"Failure",
        message:"404 Page Not Found"
    })
})

app.listen(PORT,function(req,res){
    console.log(`Server is running at this port ${PORT}`);
})