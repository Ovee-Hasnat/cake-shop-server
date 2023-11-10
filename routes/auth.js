const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Login
router.post("/login", async (req, res) => {
  let accessToken;
  try {
    const newUser = new User({
      phoneNumber: req.body.phoneNumber,
    });
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });

    if (!user) {
      //Registering new account

      try {
        const savedUser = await newUser.save();

        accessToken = jwt.sign(
          {
            id: savedUser._id,
            isAdmin: savedUser.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "2d" }
        );
        let loggedinUser = { ...savedUser._doc, accessToken };
        res.status(201).json(loggedinUser);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      //Login into account

      accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "2d" }
      );
      res.status(200).json({ ...user._doc, accessToken });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
