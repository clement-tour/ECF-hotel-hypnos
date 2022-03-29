const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");

const moment = require("moment");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromDate, toDate, totalAmount, totalDays } = req.body;

  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromDate,
      toDate,
      totalDays,
      totalAmount,
      transactionId: "1234",
    });

    const booking = await newBooking.save();

    const roomTemp = await Room.findOne({ _id: room._id });

    roomTemp.currentbookings.push({
      bookingid: booking._id,
      fromDate,
      toDate,
      userid,
      status: booking.status,
    });

    await roomTemp.save();

    res.send("La chambre a bien été reservée");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const bookingItem = await Booking.findOne({ _id: bookingid });
    bookingItem.status = "cancelled";
    await bookingItem.save();

    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;

    const temp = bookings.filter((booking) => {
      booking.bookingid.toString() !== bookingid;
    });

    room.currentbookings = temp;

    await room.save();

    res.send("Votre réservation a bien été annulée");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
