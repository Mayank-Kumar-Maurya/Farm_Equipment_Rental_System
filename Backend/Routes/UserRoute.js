const express = require('express');
const { isLoggedin } = require('../middlewares/Authorization');
const User = require('../models/User');
const Complain = require('../models/Complain');
const Product = require('../models/Product');
const router = express.Router();


router.route('/')
    .get((req, res) => {
        res.json({ msg: "user route working!" })
    });


// id -> the user you want to see profile
router.route("/viewProfile/:id")
    .get(isLoggedin, async (req, res) => {
        try {
            let { id } = req.params;
            let findUser = await User.findById(id);
            if (!findUser) {
                return res.status(400).json({ msg: "user not found" });
            }

            res.status(200).json({ msg: "success", name: findUser.name, email: findUser.email, phone_no: findUser.phone_no });
        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    });

// viewMyProfile
router.route("/viewMyProfile")
    .get(isLoggedin, async (req, res) => {
        try {
            console.log("user", req.user);
            let findUser = await User.findById(req.user.userId);
            if (!findUser) {
                return res.status(400).json({ msg: "user not found" });
            }

            res.status(200).json({ msg: "success", name: findUser.name, email: findUser.email, phone_no: findUser.phone_no, username: findUser.username });
        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    })

    .put(isLoggedin, async (req, res) => {
        try {
            let { name = req.user.name, email = req.user.email, phone_no = req.user.phone_no } = req.body;
            let updateUser = await User.findByIdAndUpdate(req.user.userId, { name, email, phone_no });
            console.log("updated user", updateUser);

            res.status(200).json({ msg: "profile updated successfully" });
        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    });


// message route

module.exports = router;