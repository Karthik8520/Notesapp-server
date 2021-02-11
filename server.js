const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const express = require("express");
const mongoose  = require("mongoose");
const app = express();


//console.log(process.env)

const db = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose.connect(db).then(()=>{
    console.log("Database connected.");
}).catch((err)=>{
    console.log("Error while connecting to database : ",err);
})


const port = process.env.DEV_PORT;
app.listen(port, ()=>{
    console.log("Notes-app listening on port ", port);
})



module.exports = app