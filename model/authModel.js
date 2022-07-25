const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');


const userSchima = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                
                    User.findOne({ name: value }, (err, data) => {
                        if (err) {
                            console.log(err.massage)
                        } else {
                            if (data) {
                                // console.error('Email should be unique')
                                return 'Email should be unique'
                            }
                        }
                    })
                
            },
            message: prop=>`${prop.value}`
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Please, enter a valid email')
                } else {
                    User.findOne({ email: value }, (err, data) => {
                        if (err) {
                            console.log(err.massage)
                        } else {
                            if (data) {
                                // console.error('Email should be unique')
                                return 'Email should be unique'
                            }
                        }
                    })
                }
            },
            message: prop=>`${prop.value}`
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
})

userSchima.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
 
const User = mongoose.model('User',userSchima)

module.exports = {
    User
}