const mongoose = require('mongoose')
const { Schema } = mongoose;

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review