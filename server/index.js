const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config()
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swag_controller')
const authCtrl = require('./controllers/auth_controller')
const cartCtrl = require('./controllers/cart_controller')

const app = express()
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

}))
app.use(checkForSession)


app.get('/api/swag', swagCtrl.read)
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)
app.post('/api/cart', cartCtrl.add)
app.post('/api/cart/checkout', cartCtrl.checkout)
app.delete('/api/cart', cartCtrl.delete)




const port = process.env.PORT || 3500
app.listen(port, () => {console.log(`Server listening on port ${port}`)})