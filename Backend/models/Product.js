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
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product