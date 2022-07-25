const mongoose = require('mongoose'),timestamps = require('mongoose-timestamp')

const roomShema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    creator: {
        type: String,
        required: true,
        trim:true
    }
       
    
}, {
    timestamps:true
})

const Room = mongoose.model('room', roomShema)

module.exports = {
    Room
}