const dbOptions = require('../config/dbConfig')

const mongoose = require('mongoose');
mongoose.connect(dbOptions.MONGO_CONN_STR, {useNewUrlParser: true}, (err) => {
    if (err) return console.log('Error to connect db')
    console.log('Connected to db')
});

module.exports = mongoose