const express = require("express")
const router = express.Router()
const { isLoggedin, isAdmin } = require("../middlewares/Authorization");
const Sit_issue = require("../models/Sit_issues");

// Check whether the logged-in user is the admin
router.get("/checkIssueAdmin", isLoggedin, (req, res) => {
    try {
        const adminId = process.env.ADMIN_USER_ID;
        const loggedInUserId = req.user?.userId;

        const isAppAdmin =
            Boolean(adminId) &&
            String(loggedInUserId) === String(adminId);

        return res.status(200).json({
            isAdmin: isAppAdmin
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Unable to verify admin",
        });
    }
});

router.route("/raiseIssue")
    .post(isLoggedin, async (req, res) => {
        try {
            let { full_name, email, phone_no, subject, message } = req.body;
            if (!full_name || !email || !phone_no || !subject || !message) {
                return res.status(400).json({ msg: "All fields are required" });
            }

            let newIssue = new Sit_issue({
                full_name, email, phone_no, subject, message
            });

            await newIssue.save();

            return res.status(200).json({ msg: "Issue raised successfully" });

        } catch (error) {
            return res.status(500).json(`error at raising issue: ${error}`)
        }
    });

router.route("/getIssues")
    .get(isLoggedin, isAdmin, async (req, res) => {
        try {
            
            let getAllIssues = await Sit_issue.find();
            return res.status(200).json({ msg: "Success", all_issues: getAllIssues });

        } catch (error) {
            return res.status(500).json(`error at get issues: ${error}`)
        }
    });

module.exports = router