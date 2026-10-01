const express = require("express");
const About = require("../models/About");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
// const upload = multer({storage})
const upload = multer({ dest: 'uploads/' })

router.route("/")
    .get(async(req, res) => {
        try {
            let getAbout = await About.find();
            if (!getAbout) {
                return res.status(400).json({ msg: "About section is missing" });
            }

            res.status(200).json({ msg: "success", about: getAbout })
        } catch (error) {
            return res.status(500).json({ msg: `internal server error, ${error}` })
        }
    })

    .post(upload.single('image'), async(req, res)=>{
        try {
          
            let {title_top, description_top, title_bottom, description_bottom} = req.body;
            let img = req.file;
            console.log(img);
            if(!title_top || !description_top)
            {
                return res.status(400).json({msg: "title and description are required fields"});
            }
            await About.deleteMany({});
            let newAbout = await new About({
                title_top,
                description_top,
                title_bottom,
                description_bottom,
                image: img?{url: img.path, filename: img.filename} : {},
            });

            let ans = await newAbout.save();
            res.status(200).json({msg: "About section added successfully"});

        } catch (error) {
            return res.status(500).json({msg:`internal server error, ${error}`})
        }
    })

    .put(upload.single('image'), async(req, res)=>{
        try {
            let getAbout = await About.findOne();
            console.log("preAbout",getAbout);
            let {title_top = getAbout.title_top,
                description_top = getAbout.description_top,
                title_bottom = getAbout.title_bottom,
                description_bottom = getAbout.description_bottom} = req.body;
                
            let img = req.file;
            if(img == undefined)
            {
                img = getAbout.image;
            }
            let updateAbout = await About.findByIdAndUpdate(getAbout._id, {
                title_top,
                description_top,
                image: img?{url: img.path, filename: img.filename} : {},
                title_bottom,
                description_bottom
            });
            console.log("updated", updateAbout);
            res.status(200).json({msg: "About section updated successfully"})

        } catch (error) {
            return res.status(500).json({msg:`internal server error, ${error}`})
        }
    });


module.exports = router;