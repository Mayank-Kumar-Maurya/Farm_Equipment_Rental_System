const jwt = require("jsonwebtoken");
const Product = require("../models/Product.js");
const Complain = require("../models/Complain.js");
const Review = require("../models/Review.js");


const isLoggedin = (req, res, next) => {
    try {
        // console.log("ok token: ", req.headers['token'])
        let token = req.headers['token'];
        jwt.verify(token, process.env.SECRET, (err, decode) => {
            if (err) {
                res.status(401).json({ message: "Login first to do the changes!" });
                return
            }

            if (!decode)
                res.status(401).json({ message: "Wrong Cradential" })
            else {
                req.user = decode
                next();
            }
        });
    } catch (error) {
        console.log("error at authorization middleware", error)
        next(error)
    }

}

// id -> product id

const isOwner = async(req, res, next) => {
   try {
    
    let {id} = req.params;
    let getOwner = await Product.findById(id);
    console.log(getOwner.owner,"==", req.user.userId)
    
    if(!getOwner.owner.equals(req.user.userId))
    {
        return res.status(401).json({msg:"You are not authorized to make changes in this equipment"})
    }

    next();

   } catch (error) {
     console.log("error at owner middleware", error)
        next(error)
   }
}

// complain
// id -> complain id
const isComplainOwner = async(req, res, next) => {
   try {
    
    let {id} = req.params;
    let getOwner = await Complain.findById(id);
    console.log(getOwner.author,"==", req.user.userId)
    
    if(!getOwner.author.equals(req.user.userId))
    {
        return res.status(401).json({msg:"You are not authorized to make changes in this equipment"})
    }

    next();

   } catch (error) {
     console.log("error at owner middleware", error)
        next(error)
   }
}


const isReviewOwner = async(req, res, next) => {
   try {
    
    let {id} = req.params;
    let getOwner = await Review.findById(id);
    console.log(getOwner.author,"==", req.user.userId)
    
    if(!getOwner.author.equals(req.user.userId))
    {
        return res.status(401).json({msg:"You are not authorized to make changes in this equipment"})
    }

    next();

   } catch (error) {
     console.log("error at owner middleware", error)
        next(error)
   }
}



module.exports = { isLoggedin, isOwner, isComplainOwner, isReviewOwner }
