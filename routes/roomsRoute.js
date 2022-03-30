const express = require("express");
const router = express.Router();
//let router = express.Router({ mergeParams: true });

const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
  try {
    console.dir(req.params);
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

/*router.post("/getroombyid", async (req, res) => {
  //let { roomid } = useParams();
  //_id: roomid
  //_id: "62374c3b7831dc99c23e6c5d"
  console.log(req.params);
  try {
    console.log(req.params);
    const roomid = req.params.roomid;
    console.log(roomid);
    const room = await Room.find({ _id: "62374c3b7831dc99c23e6c5d" });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});*/

router.post("/getroombyid", async (req, res) => {
  console.log(req.body);
  try {
    const room = await Room.findOne({ _id: req.body.roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  const {
    name,
    rentperday,
    maxcount,
    description,
    phonenumber,
    type,
    imageurls,
  } = req.body;
  console.log(req.body);

  const newroom = new Room({
    name,
    rentperday,
    maxcount,
    description,
    phonenumber,
    type,
    imageurls,
    currentbookings: [],
  });
  try {
    await newroom.save();
    res.send("La nouvelle chambre a bien été ajouté");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/addroom", async (req, res) => {
  const { roomid, name, type, rentperday, maxcount, phonenumber } = req.body;
  try {
    const roomTemp = await Room.findOne({ _id: roomid });
    roomTemp = { name, type, rentperday, maxcount, phonenumber };

    await roomTemp.save();
    res.send("La chambre a bien été modifié'");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/deleteroom", async (req, res) => {
  const { roomid } = req.body;
  try {
    const roomTemp = await Room.findOne({ _id: roomid });

    await roomTemp.remove();
    res.send("La chambre a bien été supprimé'");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
