const express = require('express')
const authMiddleware = require('../middleware/auth')
const router = new express.Router()

router.use(authMiddleware)
router.get('/verify',(req, res)=> {
    res.send(req.user)
})

module.exports=router