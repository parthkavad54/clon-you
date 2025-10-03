//require('dotenv').config({path:'./env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})



connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("ERROR",err);
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running on port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})



/* import mongoose from "mongoose";
import { DB_NAME } from "./constants"; */
/* 1st apprroch
import express from "express";
import { error } from "console";
const app = express();

;( async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_NAME}/${DB_NAME}`);
       app.on("error",(error)=>{
        console.log("ERROR",error);
        throw error;
       });

       app.listen(process.env.PORT,()=>{
        comsole.log(`port is listeing on port ${process.env.PORT}`);
       })
    } catch (error) {
        console.error("ERROR",error);
        throw error;
    }
})()

*/