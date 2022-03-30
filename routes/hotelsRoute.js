const express = require("express");
const router = express.Router();

const Hotel = require("../models/hotel");

router.get("/getallhotels", async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.send(hotels);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addhotel", async (req, res) => {
  const { name, city, address, description } = req.body;
  console.log(req.body);

  const newhotel = new Hotel({
    name,
    city,
    address,
    description,
  });
  try {
    await newhotel.save();
    res.send("La nouvelle chambre a bien été ajouté");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/addhotel", async (req, res) => {
  const { hotelid, name, city, address, description } = req.body;
  console.log(req.body);
  try {
    const hotelTemp = await Hotel.findOne({ _id: hotelid });
    console.log(hotelTemp);
    hotelTemp.name = name;
    hotelTemp.city = city;
    hotelTemp.address = address;
    hotelTemp.description = description;

    await hotelTemp.save();
    res.send("L'hôtel a bien été modifié'");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;