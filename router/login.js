const express = require("express");
const router = new express.Router();
const { User } = require("../model/authModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Token } = require("../model/tokenModel.js");

router.post("/login", async (req, res) => {
  User.findOne({ email: req.body.email }, async (err, data) => {
    if (err) {
      res.status(404).send(err.massage);
    } else {
      try {
        const match = await bcrypt.compare(
          `${req.body.password}`,
          data.password
        );
        if (!match) {
          return res.status(404).send(`unable to log in`);
        } else {
          const token = jwt.sign(
            { _id: data._id, name: data.name },
            "putymass"
          );
          const authTOken = new Token({ token: token });
          authTOken
            .save()
            .then((token) => {
              res.send({
                data,
                token,
              });
            })
            .catch((err) => {
              res.send(err.massage);
            });
        }
      } catch (error) {
        return res.status(404).send(error.massage);
      }
    }
  }).clone();
});

module.exports = router;
