require('dotenv').config();

const express = require('express');
const { isLoggedin, isBookingOwner } = require('../middlewares/Authorization');
const Booking = require('../models/Booking');
const Product = require('../models/Product');
const router = express.Router({ mergeParams: true })
const razorpay  =  require("razorpay");


const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.route("/payment-razorpay")
    .post(isLoggedin, async (req, res) => {

        try {
        console.log("Hello")
    const { bookingId } = req.body;
         console.log(req.body)
    const bookingData = await Booking.findById(bookingId);
          console.log(bookingData)
          console.log(23)
    if (!bookingData || bookingData.booking_status!=0) {
      return res.json({
        success: false,
        message: "Cancelled or not found",
      });
    }
  
    const  equipmentData = await  Product.findById(bookingData.equipment)
    // Original amount in USD
    console.log(equipmentData)
    if(!equipmentData){
        return res.status(500).json({message:"Equipment not  found"})
    }
    const Amount = equipmentData.price;

 



    // Razorpay options
    const options = {
      amount: Amount*100, // convert rupees to paise
      currency: "INR",
      receipt: bookingId,
    };

    // Create order
    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
    })

router.route("/verifyRazorpay")
    .post(isLoggedin, async (req, res) => {
    try{
        const {razorpay_order_id}  = req.body
        const orderInfo  = await razorpayInstance.orders.fetch(razorpay_order_id)

        console.log(orderInfo)

        if(orderInfo.status === 'paid'){
          await Booking.findByIdAndUpdate(orderInfo.receipt,{booking_status:1})
          res.json({success:true,message:"Payment Successfull"})
        }
        else {
            res.json({success:false,message:"Payment failed"})
        }
    }
    catch(err){
           console.log(err);
    res.json({ success: false, message: err.message });
    }
})




module.exports = router;