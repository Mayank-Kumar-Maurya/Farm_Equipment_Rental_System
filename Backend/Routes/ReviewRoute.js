const express = require('express');
const { isLoggedin, isReviewOwner} = require('../middlewares/Authorization');
const Review = require('../models/Review');
const Product = require('../models/Product');
const router = express.Router({ mergeParams: true });


// id -> equipment id
router.route("/")
.post(isLoggedin, async(req, res)=>
{
    try {
        let{id} = req.params;
        let {rating, comment} = req.body;
        if (!id) {
            return res.status(400).json({ msg: "No equipment is selected" });
        }
        if (!comment) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        let newReview = await new Review({
            author: req.user.userId,
            rating: rating,
            comment: comment
        });

        let updateEquipment = await Product.findById(id);
        updateEquipment.reviews.push(newReview);

        await newReview.save();
        await updateEquipment.save();

        res.status(200).json({ msg: "review submitted" });

    } catch (error) {
        return res.status(500).json({ msg: `internal server error ${error}` });   
    }
})

router.route("/:reviewId")
.delete(isLoggedin, isReviewOwner, async (req, res) => {
    try {
        let { id, reviewId } = req.params; // productId, reviewId
        let updateProduct = await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        let deleteReview = await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ msg: "review deleted" });
    } catch (error) {
        return res.status(500).json({ msg: `internal server error ${error}` });
    }
})

module.exports = router