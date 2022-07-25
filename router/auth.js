const express = require('express')
const router = new express.Router()
const { User } = require('../model/authModel.js');
const jwt = require("jsonwebtoken");
const { Token } = require('../model/tokenModel.js');

router.post('/user', (req, res) => {
    const token = jwt.sign({ name:req.body.name }, "putymass");
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        user.save().then(user => {
            const authToken = new Token({ token: token })
            authToken.save().then(token => {
                res.status(201).send({
                    user,token
                })
            }).catch(err => {
                res.send(err.massage)
            })
        }).catch(err => {
            res.status(400).send(err.massage)
        })
    } catch (error) {
        res.status(400).send(error.massage)
    }
})

module.exports = router

