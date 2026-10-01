require('dotenv').config()

const express = require('express')
const app = express();
const port = 8080;
const mongoose = require('mongoose')
const cors = require('cors');

const AllRoutes = require('./Routes/AllRoutes');
const SearchProduct = require('./Routes/SearchProduct');
const LoginRoute = require('./Routes/LoginRoute');
const UserRoute = require('./Routes/UserRoute');
const AboutRoute = require('./Routes/AboutRoute');
const ComplainRoute = require('./Routes/ComplainRoute');
const ReviewRoute = require('./Routes/ReviewRoute');

const dburl = process.env.dburl || 'mongodb://127.0.0.1:27017/FERS';

async function main() {
    try {
        await mongoose.connect(dburl);
        console.log('mongodb connected')
    } catch (error) {
        return console.log("error at mongodb", error);
    }
}

main()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", AllRoutes);
app.use("/search", SearchProduct);
app.use("/auth", LoginRoute);
app.use("/user", UserRoute);
app.use("/about", AboutRoute);
app.use("/:id/complains", ComplainRoute);  // eg:- localhost:8080/12345/complains 
app.use("/:id/reviews", ReviewRoute);


app.all("{*any}", (req, res) => {
    res.status(404).json({ msg: "page not found" });
});

// error handling
app.use((err, req, res, next) => {
    console.log("error at error handler", err);
    let { status = 500, message = 'internal server error' } = err;
    res.status(status).json({ message: message });
});

app.listen(port, () => {
    console.log("Server connected to port:", port);
});