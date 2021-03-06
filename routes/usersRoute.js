const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    newUser.save();
    res.send("L'utilisateur a bien été enregistré");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });

    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        status: user[0].status,
        _id: user[0]._id,
      };
      res.send(currentUser);
    } else {
      return res
        .status(400)
        .json({ message: "L'email ou le mot de passe est incorrect" });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Une erreur est survenue, merci de réessayer ultérieurement",
    });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;

  try {
    await User.findOneAndDelete({ _id: userid });
    res.send("User Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.put("/modifyUser", async (req, res) => {
  console.log(req.body);
  const { userid, name, email, status } = req.body;
  try {
    const userTemp = await User.findOne({ _id: userid });
    userTemp.name = name;
    userTemp.email = email;
    userTemp.status = status;

    await userTemp.save();
    res.send("L'utilisateur a bien été modifié'");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
