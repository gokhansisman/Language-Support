const mongoose = require('mongoose')
const {Schema} = mongoose

const fieldNames = {
    turkish: String,
    english: String,
    polish: String,
    spanish: String,
    sentences: String
}

const schema = new Schema({
    ...fieldNames
})

const Words = mongoose.model('Words', schema);

module.exports = Words
module.exports.fieldNames = fieldNames