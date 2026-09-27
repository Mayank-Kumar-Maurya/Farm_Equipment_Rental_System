require('dotenv').config()

const express = require('express')
const app = express();
const port = 8080;
const mongoose = require('mongoose')
const cors = require('cors');

const AllRoutes = require('./Routes/AllRoutes');
const LoginRoute = require('./Routes/LoginRoute');

const dburl = process.env.dburl || 'mongodb://127.0.0.1:27017/FERS';

async function main(){
    try {
        await mongoose.connect(dburl);
        console.log('mongodb connected')
    } catch (error) {
        return console.log("error at mongodb", error);
    }
}

main()

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use("/", AllRoutes)
app.use("/auth", LoginRoute)

app.listen(port, ()=>{
    console.log("Server connected to port:", port);
})