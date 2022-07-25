const mongoose = require('mongoose');

const tokenShema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        
    }
},
{
    timestamps:true
}
)


const Token = mongoose.model('token', tokenShema)

module.exports = {
    Token
}