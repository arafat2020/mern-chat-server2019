const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    msg: {
        type: String,
        required:true
    },
    sender: {
        type: String,
        requred: true,
        trim:true
    },
    room: {
        type: String,
        required: true,
        trim:true
    }
}, {
    timestamps:true
})

const Msg = mongoose.model('msg', msgSchema)

module.exports = {
    Msg
}