const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    catergory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        url: String,
        filename: String
    }],
    rating: {
        type: Number,
        maxLength: 5,
        minLength: 1,
        required: true
    },
    phone_no: {
        type: Number,
        required: true
    },
    booked_dates: [{
        type: Date
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    complains: [{
      type: Schema.Types.ObjectId,
      ref: 'Complain'
    }],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],  // [longitude, latitude]
            required: true
        },
        address: String      // human readable address
    }
})

ProductSchema.index({ location: '2dsphere' })

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product