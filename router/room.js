const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = new express.Router();
const { Room } = require("../model/roomModel");
const { ObjectId } = require("mongodb");
const { Msg } = require("../model/msgModel");

router.use(authMiddleware);
router.post("/room", (req, res) => {
  if (req.user) {
    const room = Room(req.body);
    room
      .save()
      .then((data) => {
        return res.status(201).send(data);
      })
      .catch((err) => {
        return res.status(400).send(err.massage);
      });
  }
});
router.get("/room", async (req, res) => {
  if (req.user) {
    await Room.find().then((data) => {
      res.send(data);
    });
  }
});
router.delete("/room", (req, res) => {
  console.log(req.body.id)
  if (req.user) {
    try {
      Room.findOne({ _id: new ObjectId(req.body.id) }, async (err, data) => {
        if (err) {
          res.sned(err);
        } else {
          try {
            await Room.deleteOne({ _id: new ObjectId(req.body.id) })
            await Msg.deleteMany({ room: data.roomName })
            res.send({dlt:true})
          } catch (error) {
            res.send({
              dlt: false,
              err:'Room not found'
            })
          }
        }
      });
    } catch (error) {
      res.send(error);
    }
  }
});

module.exports = router;

//  .then(async(data) => {
//   await Room.deleteOne({id:new ObjectId(req.body.id)})
//   await Msg.deleteMany({ room: data.roomName })
//   res.send('deleted')
// })
// .catch((err) => {
//   res.send(err);
// })
