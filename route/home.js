const express = require('express')
const app = express()
const router = express.Router()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Message = require('../model/Message')

// let message = [
    
// ];



router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'home'
    next()
})

router.get('/', (req, res)=>{
    res.render('home/index')
})


router.get('/message', (req, res)=>{
    Message.find()
    .then(message=>{
        return res.send(message)
    })
    .catch(err=> console.log('Error'))
    // return res.send(message)
})

router.post('/create_msg', (req, res)=>{
    
    const newMessage = new Message(req.body)
    newMessage.save()
    .then(saved=>{
        // message.push(req.body)
        res.sendStatus(200)
        io.emit('message', req.body)
    })
    .catch(err=> console.log(`Error due to ${err}`))

    

})


module.exports = router;