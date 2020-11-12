const express = require('express')
const app = express()
const router = express.Router()
const http = require('http').Server(app)
const io = require('socket.io')(http)

let message = [
    
];



router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'home'
    next()
})

router.get('/', (req, res)=>{
    res.render('home/index')
})


router.get('/message', (req, res)=>{
    return res.send(message)
})

router.post('/create_msg', (req, res)=>{
    message.push(req.body)
    res.sendStatus(200)
    io.emit('message', req.body)

})


module.exports = router;