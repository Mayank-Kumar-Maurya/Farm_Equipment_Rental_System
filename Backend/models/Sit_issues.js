const mongoose = require('mongoose')

const sit_issues_schema = mongoose.Schema({
    full_name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone_no:{
        type: Number,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
});

const Sit_issue = mongoose.model('Sit_issue', sit_issues_schema)
module.exports = Sit_issue