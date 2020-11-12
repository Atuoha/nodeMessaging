const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newMessage = new Schema({

    name:{
        type: String
    },

    message:{
        type: String
    },

    date:{
        type:Date,
        default: new Date()
    }
})

module.exports = mongoose.model('chats', newMessage)