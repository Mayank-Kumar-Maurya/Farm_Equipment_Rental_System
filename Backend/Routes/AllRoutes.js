const express = require('express');
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const { isLoggedin, isOwner } = require('../middlewares/Authorization.js');
const Booking = require('../models/Booking.js');
const Product = require('../models/Product.js');
const upload = multer({storage})
// const upload = multer({ dest: 'uploads/' })


router.route('/')
    .get((req, res) => {
        res.send("hi there!");
    })

router.route("/addEquipments")
    .get(isLoggedin, (req, res) => {
        console.log("ans", req.user)
        res.send("addEquipment")
    })
    .post(isLoggedin, upload.array('images', 6), async (req, res) => {
        try {

            let { name, brand, catergory, price, description, rating, address } = req.body;
            console.log("add equip", req.body);
            let img = req.files;
            console.log("img -> ", img);

            let newEquipment = await new Product({
                name: name,
                brand: brand,
                catergory: catergory,
                price: price,
                description: description,
                rating: rating,
                images: img.map(i => ({ url: i.path, filename: i.filename })),
                phone_no: req.user.phone_no,
                owner: req.user.userId,
                location:  address
                // location: {
                //     type: 'Point',
                //     coordinates: [parseFloat(80), parseFloat(24)], // lng, lat
                //     address: address
                // }
            });

            let ans = await newEquipment.save();
            console.log("ans", ans);
            res.status(200).json({ msg: "equipment added successfully" });

        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    })

router.route("/showAllEquipments")
    .get(async (req, res) => {
        try {
            let findAllEquipments = await Product.find();
            if (!findAllEquipments) {
                return res.status(200).json({ msg: "No Equipments are there", Equipments: [] });
            }
            return res.status(200).json({ msg: "success", Equipments: findAllEquipments });

        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    });

// show equip by id -> pass the equipment(Product) id
router.route("/showEquipment/:id")
    .get(async (req, res) => {
        try {
            let { id } = req.params;
            let findEquip = await Product.findById(id).populate('owner').populate(
                {
                    path: 'complains',
                    populate: {
                        path: 'author'
                    }
                })
                .populate({
                    path: 'reviews',
                    populate: {
                        path: 'author'
                    }
                });
            if (!findEquip) {
                return res.status(400).json({ msg: "equipment not found" });
            }

            return res.status(200).json({ msg: "success", Equipment: findEquip });
        } catch (error) {
            console.log("get equip", error)
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    })

    // update
    .put(isLoggedin, isOwner, upload.array('images', 6), async (req, res) => {
        try {
            let { id } = req.params;


        //     let { name, brand, catergory, price, description, rating } = req.body  // only allowed fields
        // let img = req.files

        // let updatedFields = { name, brand, catergory, price, description, rating }

        // // if new images uploaded, add them too
        // if (img && img.length > 0) {
        //     updatedFields.images = img.map(i => ({ url: i.path, filename: i.filename }))
        // }

        // let updateEquip = await Product.findByIdAndUpdate(id, updatedFields)
        // if (!updateEquip) {
        //     return res.status(400).json({ msg: "equipment not found" })
        // }

        // return res.status(200).json({ msg: "equipment updated successfully" })

            
            let updateEquip = await Product.findByIdAndUpdate(id, { ...req.body });
            let img = req.files;
           
            if (img.length != 0) {
                updateEquip.images = img.map(i => ({ url: i.path, filename: i.filename }));
                await updateEquip.save();
            }
            
            return res.status(200).json({ msg: "equipment updated successfully" });
        } catch (error) {
            console.log("error at update equip", error)
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    })

    .delete(isLoggedin, isOwner, async (req, res) => {
        try {
            let { id } = req.params;
            let deleteEquip = await Product.findByIdAndDelete(id);
            console.log("delete equip", deleteEquip);
            res.status(200).json({ msg: "equipment deleted successfully" });
        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    });


router.route("/showMyEquipments")
    .get(isLoggedin, async (req, res) => {
        try {

            let myEquipments = await Product.find({ owner: req.user.userId })
            if (!myEquipments) {
                return res.status(400).json({ msg: "you have not added any equipment" })
            }

            res.status(200).json({ msg: "success", Equipments: myEquipments })

        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    })

// router.route("/nearbyEquipments", async (req, res) => {
//     try {
//         const { lat, lng, radius = 20 } = req.query;

//         let findNearbyEquipments = await Product.find({
//             location: {
//                 $nearSphere: {
//                     $geometry: {
//                         type: 'Point',
//                         coordinates: [parseFloat(lng), parseFloat(lat)]
//                     },
//                     $maxDistance: radius * 10000
//                 }
//             }
//         });
//         console.log("nearbyEquip", findNearbyEquipments);
//         res.status(200).json({ msg: "success", Equipments: findNearbyEquipments });

//     } catch (error) {
//         return res.status(500).json({ msg: `internal server error ${error}` });
//     }
// })


module.exports = router