const express = require('express');
const router = express.Router();
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const { isLoggedin } = require('../middlewares/Authorization.js');
const Booking = require('../models/Booking.js');
const Product = require('../models/Product.js');
const upload = multer({storage})
// const upload = multer({ dest: 'uploads/' })


router.route('/')
.get((req, res)=>
{
    res.send("hi there!");
})

router.route("/addEquipments")
.get(isLoggedin, (req, res)=>
{
    console.log("ans",req.user)
    res.send("addEquipment")
})
.post(isLoggedin, upload.array('photos', 6) ,async(req, res)=>
{
    try {
        
        let {name, brand, catergory, price, description, rating} = req.body;
        console.log("add equip",req.body);
        let img = req.files;
        console.log("photos ",req.files, req.file)
        console.log("img -> ",img);

        let newEquipment = await new Product({
            name:name,
            brand:brand,
            catergory:catergory,
            price:price,
            description:description,
            rating:rating,
            images:img.map(i => ({url: i.path, filename: i.filename})),
            phone_no: req.user.phone_no
        });

        let ans = await newEquipment.save();
        console.log("ans", ans);
        res.status(200).json({msg:"equipment added successfully"});

    } catch (error) {
        return res.status(500).json({msg:`internal server error ${error}`});
    }
})


router.route("/bookEquipment")
.post(isLoggedin, async(req, res)=>
{
    try {
        
        let {equipment_id, date, duration, location} = req.body;

        let newBooking = await new Booking({
            equipment_id: equipment_id,
            date: date,
            duration: duration, 
            location: location
        })

        await newBooking.save();
        res.status(200).json({msg:"equipment booked successfully"});

    } catch (error) {
        return res.status(500).json({msg:`internal server error ${error}`});
    }
})

module.exports = router