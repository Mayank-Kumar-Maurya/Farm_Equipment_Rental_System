const mongoose = require('mongoose')
const { Schema } = mongoose;

const bookingSchema = mongoose.Schema({
    equipment_id:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required : true
    },
    date: {
        type: Date,
        required : true
    },
    duration: {
        type: Number,
        required : true
    },
    location: {
        type: String,
        required : true
    },

})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;