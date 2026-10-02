const express = require('express');
const { isLoggedin, isBookingOwner } = require('../middlewares/Authorization');
const Booking = require('../models/Booking');
const Product = require('../models/Product');
const router = express.Router({ mergeParams: true });

// owner show allbookings

router.route("/listedAppointments")
    .get(isLoggedin, async (req, res) => {
        try {

            let myEquipments = await Product.find({ owner: req.user.userId,  bookings: { $exists: true, $not: { $size: 0 }} }).populate('bookings');
            if (!myEquipments) {
                return res.status(400).json({ msg: "you have not added any equipment yet" });
            }

            return res.status(200).json({ msg: "success", myEquipmentsWithBookings: myEquipments });


        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` })
        }
    })

router.route("/:bookingId/approve")
    .post(isLoggedin, async (req, res) => {
        try {
            let { bookingId } = req.params;
            if(!bookingId)
            {
                return res.status(400).json({msg:"booking id not found"});
            }
            let findBooking = await Booking.findByIdAndUpdate(bookingId, { booking_status: 0 });
            if(!findBooking)
            {
                return res.status(400).json({msg:"booking not found"});
            }
            res.status(200).json({ msg: "booking approved" });
        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` })
        }
    });

// view mybooking
router.route("/viewMyBooking")
    .get(isLoggedin, async (req, res) => {
        try {

            let findMyBooking = await Booking.find({ who_booked: req.user.userId });
            if (!findMyBooking) {
                return res.status(400).json({ msg: "you have not booked any equipment yet" });
            }

            res.status(200).json({ msg: "success", myBookings: findMyBooking });

        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` })
        }

    });

router.route("/:id/bookings")
    .post(isLoggedin, async (req, res) => {
        try {

            let { id } = req.params;
            let { date, location } = req.body;
            if (!id) {
                return res.status(400).json({ msg: "equipment id not found" });
            }
            if (!date || !location) {
                return res.status(400).json({ msg: "all fields required" });
            }

            let findEquipment = await Product.findById(id);
            if (!findEquipment) {
                return res.status(400).json({ msg: "equipment not found" });
            }

            let allBookedDates = findEquipment.booked_dates;

            // normalize all booked dates to "YYYY-MM-DD" strings
            let bookedStrings = allBookedDates.map(d => new Date(d).toISOString().split('T')[0])

            // normalize incoming date
            let incomingDate = new Date(date).toISOString().split('T')[0]

            if (bookedStrings.includes(incomingDate)) {
                return res.status(400).json({ msg: "Equipment not available on this date" })
            }

            let newBooking = await new Booking({
                date,
                location,
                who_booked: req.user.userId,
            });

            findEquipment.booked_dates.push(date);
            findEquipment.bookings.push(newBooking);
            await newBooking.save();
            await findEquipment.save();

            res.status(200).json({ msg: "equipment booked successfully" });

        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` })
        }
    })

router.route("/:id/bookings/:bookingId")
    .delete(isLoggedin, isBookingOwner, async (req, res) => {
        try {
            let { id, bookingId } = req.params;
            if (!bookingId) {
                return res.status(400).json({ msg: "equipment id not found" });
            }

            let findBooking = await Booking.findById(bookingId);
            if (!findBooking) {
                return res.status(400).json({ msg: "booking not found" });
            }
            let updateEquip = await Product.findByIdAndUpdate(id, { $pull: { bookings: bookingId, booked_dates: findBooking.date } })

            let deleteBooking = await Booking.findByIdAndDelete(bookingId);

            res.status(200).json({ msg: "booking deleted successfully" });

        } catch (error) {
            return res.status(500).json({ msg: `internal server error ${error}` })
        }
    });



module.exports = router;