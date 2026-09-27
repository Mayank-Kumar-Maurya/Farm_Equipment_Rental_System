const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_no:{
        type:Number,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 16,
        required: true
    }
})


// 
userSchema.pre("save", function()
{
    try {
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(this.password, salt);
        this.password = hash
    } catch (error) {
        console.log("on userschema",error);
    }
});

userSchema.methods.generateToken = async function(){
    try {
        
        return jwt.sign(
            // playload
            {
                userId: this._id,
                username: this.username,
                email: this.email,
                name: this.name,
                phone_no: this.phone_no
            },

            // secret
            process.env.SECRET,

            // limit
            {
                expiresIn: '7d'
            }
        );
    } catch (error) {
        console.log("error on generating token", error);
        return error
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User