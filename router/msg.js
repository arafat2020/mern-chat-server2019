const express = require("express");
const authMiddleware = require("../middleware/auth");
const { Msg } = require("../model/msgModel");
const { Room } = require("../model/roomModel");
const { ObjectId } = require("mongodb");
const router = new express.Router();

router.use(authMiddleware);
router.post("/msg", async (req, res) => {
  if (req.user) {
    await Room.findOne({ roomName: req.body.room }, (err, data) => {
      if (err) {
        return res.status(404);
        console.log(err);
      } else {
        const msg = new Msg({
          msg: req.body.msg,
          sender: req.user.name,
          room: data.roomName,
        });
        msg
          .save()
          .then((msg) => {
            return res.status(201).send(msg);
          })
          .catch((err) => {
            res.send(err);
          });
      }
    }).clone();
  }
});

router.post("/get_msg", (req, res) => {
  if (req.user) {
    if (req.body.room) {
      Room.findOne({ roomName: req.body.room }, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          Msg.find({ room: data.roomName })
            .then((msg) => {
              res.send(msg);
            })
            .catch((err) => {
              res.send(err);
            });
        }
      });
    }
  }
});
router.delete("/dlt_msg", (req, res) => {
  try {
    Msg.deleteOne({ _id: new ObjectId(req.body.id) })
      .then((up) => {
        return res.status(200).send(up);
      })
      .catch((err) => {
        return res.status(400).send(err.massage);
      });
  } catch (error) {
    res.send(error);
  }
});
router.put("/udt_msg", (req, res) => {
  Msg.updateOne({ _id: new ObjectId(req.body.id) }, { msg: req.body.msg })
    .then((up) => {
      return res.status(200).send(up);
    })
    .catch((err) => {
      return res.status(400).send(err.massage);
    });
});

module.exports = router;
