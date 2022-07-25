const express = require("express");
const { Token } = require("../model/tokenModel");
const router = new express.Router();

router.get('/logout', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    Token.findOneAndDelete({ token: token }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
    
})

module.exports=router