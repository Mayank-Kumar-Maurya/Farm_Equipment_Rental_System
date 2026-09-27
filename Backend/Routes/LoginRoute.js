const express = require("express");
const router = express.Router()
const User = require("../models/User");
const bcrypt = require("bcrypt")

router.route("/")
.get((req, res)=>
{
    res.json({msg:"login route working!"})
});

router.route("/register")
.get((req, res)=>res.json({msg:"register"}))
.post(async(req, res)=>
{
    try {
        let {username, name, email, password, phone_no} = req.body;
        if(!username || !name|| !email || !password || !phone_no)
        {
            console.log('all fiel are required');
            return res.status(400).json({msg:'all fields are required'});
        }

        let createuser = new User(
            {
                username,
                name,
                email,
                password,
                phone_no
            }
        );

        let ans = await createuser.save();
        console.log(ans)
        res.status(201).json({msg: 'User registered successfully'})
    } catch (error) {
        res.status(500).json({msg:`internal server error ${error}`})
    }
})

router.route('/login')
.post(async(req, res)=>
{
    try {
        const {email, password} = req.body;
        if(!email || !password)
        {
            console.log('all fiel are required');
            return res.status(401).json({msg:'all fields are required'});
        }

        const user = await User.findOne({email});
        console.log(user)
        if(!user)
        {
            console.log('invalid credentials');
            return res.status(401).json({msg:'invalid credentials'});
        }
        
        let match = await bcrypt.compare(password, user.password);
       
        if(!match)
        {
            console.log('invalid credentials');
            return res.status(401).json({msg:'invalid credentials2'});
        }
        let token = await user.generateToken();
        res.json({
            token:token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                username:user.username
            }
        })

    } catch (error) {
        res.status(500).json({msg:`internal server error ${error}`})
    }
})


module.exports = router