const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newChat = new Schema({

    name:{
        type: String
    },

    message:{
        type: String
    },

    date:{
        type:Date
        default: new Date()
    }
})

module.exports = mongoose.model('chats', newChat)