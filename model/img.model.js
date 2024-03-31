const mongoose = require('mongoose')

const imgSchema = mongoose.Schema({
    img: String
})

module.exports = mongoose.model('img', imgSchema)