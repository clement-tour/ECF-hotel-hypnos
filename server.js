const express = require("express");

const app = express();
app.use(express.json());

const dbConfig = require("./db");

const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingRoute = require("./routes/bookingsRoute");

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);

const port = process.env.PORT || 2000;

app.listen(port, () =>
  console.log(`Node server run with Nodemon on port ${port}`)
);

// -------------------------

// TEST SANS UTILISER LE ROUTER

// const express = require("express");

// const app = express();
// app.use(express.json());

// const dbConfig = require("./db");
// //const roomsRoute = require("./routes/roomsRoute");

// //app.use("/api/rooms", roomsRoute);

// const port = process.env.PORT || 2000;

// const Room = require("./models/room");

// app.get("/api/rooms/getallrooms", async (req, res) => {
//   try {
//     console.dir(req);
//     console.dir(res);
//     console.dir(req.params);
//     const rooms = await Room.find({});
//     res.send(rooms);
//   } catch (error) {
//     return res.status(400).json({ message: error });
//   }
// });

// app.post("/api/rooms/getroombyid", async (req, res) => {
//   //_id: roomid
//   //_id: "62374c3b7831dc99c23e6c5d"
//   console.log(req.params);
//   try {
//     console.log(req.params);
//     const roomid = req.params.roomid;
//     const room = await Room.find({ _id: "62374c3b7831dc99c23e6c5d" });
//     console.log(req.params);
//     res.send(room);
//   } catch (error) {
//     return res.status(400).json({ message: error });
//   }
// });

// app.listen(port, () =>
//   console.log(`Node server run with Nodemon on port ${port}`)
// );

// -------------------------
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// var express = require("express");
// var bodyParser = require("body-parser");
// var app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const port = process.env.PORT || 2000;

// app.post("/getroombyid", function (req, res) {
//   console.log("receiving data ...");
//   console.log("body is ", req.body);
//   res.send(req.body);
// });

// // start the server
// app.listen(port);
// console.log("Server started! At http://localhost:" + port);
