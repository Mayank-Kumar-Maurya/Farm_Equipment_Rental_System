const express = require('express');
const { isLoggedin, isComplainOwner } = require('../middlewares/Authorization');
const router = express.Router()



// Complain
//  id -> equipment id
router.route("/")
    .post(isLoggedin, async (req, res) => {
        try {
            let { id } = req.params;
            let { message } = req.body;
            if (!id) {
                return res.status(400).json({ msg: "No equipment is selected" });
            }
            if (!message) {
                return res.status(400).json({ msg: "please enter message" });
            }

            let newComplain = await new Complain({
                author: req.user.userId,
                message: message
            });

            let updateEquipment = await Product.findById(id);
            updateEquipment.complains.push(newComplain);

            await newComplain.save();
            await updateEquipment.save();

            res.status(200).json({ msg: "complain registered" });
        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    })

router.route("/:complainId")
    .delete(isLoggedin, isComplainOwner, async (req, res) => {
        try {
            let { id, complainId } = req.params; // productId, complainId
            let updateProduct = await Product.findByIdAndUpdate(id, { $pull: { complains: complainId } });
            let deleteComplain = await Complain.findByIdAndDelete(complainId);
            res.status(200).json({ msg: "complain resolved" });
        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    })

module.exports = router