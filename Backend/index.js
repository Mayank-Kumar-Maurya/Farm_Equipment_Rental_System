const express = require('express')
const app = express();
const port = 8080;
const mongoose = require('mongoose')

const AllRoutes = require('./Routes/AllRoutes');

const dburl = '';

async function main(){
    await mongoose.connect(dburl);
}

app.use("/home", AllRoutes)

app.listen(port, ()=>{
    console.log("Server connected to port:", port);
})