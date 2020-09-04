const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const factRoutes = require('./api/routes/facts')


//enter you mongo connection string annd uncomment the following code

// mongoose.connect('connection string here', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//CORS error removal
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next();
})


app.use('/facts', factRoutes)


module.exports = app;