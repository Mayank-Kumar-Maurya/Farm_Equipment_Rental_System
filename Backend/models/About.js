const mongoose = require("mongoose");
const {Schema} = mongoose

const aboutSchema = mongoose.Schema({
    title_top:{
        type:String,
        required:true
    },
    description_top:{
        type:String,
        required:true
    },
    image: {
        url: String,
        filename: String
    },
    title_bottom:{
        type:String,
    },
    description_bottom:{
        type:String
    },
});


const About = mongoose.model("About", aboutSchema);
module.exports = About;
