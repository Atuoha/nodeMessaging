const express =  require('express');
const app = express();
const port = process.env.PORT || 8989;
const handlebars = require('express-handlebars');
const Handlebars = require('Handlebars');
const path = require('path')
const bodyParser = require('body-parser')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const http =  require('http').Server(app)
const io  = require('socket.io')(http)
const mongoose = require('mongoose');
const mongoDBURI = 'mongodb://localhost:27017/nodeChat'


mongoose.connect(mongoDBURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(db=>{
    console.log('connected to mongodb...')
})
.catch(err=>{
    console.log(`Error ${err}`)
})

app.use(express.static(path.join(__dirname, 'public')))


//handlebars
app.engine('handlebars', handlebars(
    {
        defaultLayout: 'home',
        helpers:{},
        partialsDir: path.join(__dirname, "views/layouts/partials"),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    
    }
    
))

//setting bodyParsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//setting handlebars
app.set('view engine', 'handlebars')


// Routers
const home = require('./route/home')
app.use('/', home)

io.on('connection', socket=>{
    console.log('User connected....')
})


// app.listen(port, ()=>{
//     console.log(`Listening to port ${port}`);
// });


http.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});