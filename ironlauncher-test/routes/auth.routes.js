const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

router.post("/signup", (req, res, next) => {
  const encryptedPassword = bcrypt.hashSync(req.body.password, salt);

  const newUser = {
    email: req.body.email,
    password: encryptedPassword,
  };

  // EXTRA VERIFICATIONS TO CHECK PASSWORD LENGTH, etc...

  User.create(newUser)
    // SUPER BAD TO SEND THE PASSWORD BACK TO THE CLIENT, EVEN IF IT'S ENCRYPTED
    .then((data) => res.json({ message: "user created!", data })) // 🙅‍♀️
    .catch((error) => next(error));
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .then((data) => {
      const foundUser = data[0];
      // THIS IS THE PASSWORD COMPARE
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      // ONCE THE PASSWORD IS CHECKED WE CAN SEND THE RESPONSE
      if (isPasswordCorrect) {
        res.status(200).send("Password correct, you are now logged in");
      } else {
        res.status(401).send("Not authorized to log in with this password");
      }
    })
    .catch((error) => next(error));
});

module.exports = router;
