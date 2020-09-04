const mongoose = require('mongoose')


//create schema
const factSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    author: String
})

module.exports = mongoose.model('Fact', factSchema)