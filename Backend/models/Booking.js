const mongoose = require('mongoose')
const { Schema } = mongoose;

const bookingSchema = mongoose.Schema({
    date: {
        type: Date,
        required : true
    },
    // duration: {
    //     type: Number,
    //     required : true
    // },
    location: {
        type: String,
        // required : true
    },
    who_booked:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    booking_status: {
        type: Number,
        default: -1  // -1 -> not approved, 0-> approved, 1->payment done
    }

})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;