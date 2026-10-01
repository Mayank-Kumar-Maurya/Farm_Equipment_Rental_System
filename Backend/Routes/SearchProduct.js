const express = require("express");
const router = express.Router()
const Product = require("../models/Product");


router.route("/")
    .get(async (req, res) => {
        let { search } = req.query;
        
        if (!search) {
            return res.status(400).json({ msg: "Please Enter to search" });
        }

        let query = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { catergory: { $regex: search, $options: "i" } }
            ]
        };

        let findEquipment = await Product.find(query);
        if (!findEquipment) {
            return res.status(400).json({ msg: "No such Equipment exists" });
        }

        res.status(200).json({ msg: "success", Equipments: findEquipment });
    });

module.exports = router