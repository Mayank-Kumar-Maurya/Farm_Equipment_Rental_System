const mongoose = require('mongoose')
const { Schema } = mongoose;

const complainSchema = mongoose.Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }

})

const Complain = mongoose.model('Complain', complainSchema);
module.exports = Complain;