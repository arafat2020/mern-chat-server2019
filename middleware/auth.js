const { Token } = require("../model/tokenModel")
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        Token.findOne({token:token}, (err, data) => {
            if (err) {
                res.send(err)
                next()
                
            } else {
                jwt.verify(`${token}`, "putymass", (err, decoded) => {
                    if (err) {
                        res.status(404).send(err)
                        next()
                    } else {
                        req.user = decoded
                        next()
                    }
                })
                
            }
        })
    } else {
        return res.ststus(400).send('Please provie aothorization credential')
        next()
    }
    
}

module.exports=authMiddleware


// {"_id":{"$oid":"62d404308d2da9ae29a5729e"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibG9rYW1uIiwiaWF0IjoxNjU4MDYxODcyfQ.2jZEdohr84omyYHLfUJK0m7m9l5cIyi7CDM74R75dLU","createdAt":{"$date":{"$numberLong":"1658061872704"}},"updatedAt":{"$date":{"$numberLong":"1658061872704"}},"__v":{"$numberInt":"0"}}