const express = require('express')

const app = express()

const db = require('./db/index')
const Words = require('./model/words')
const WordsFieldNames = require('./model/words').fieldNames
const path = require('path');
app.set('json spaces', 3)
app.set('view engine', 'ejs')

const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(express.static(path.join(__dirname, './client/build')));
app.use(bodyParser.json());


/*
app.get('/', (req, res) => {
    Words.find({}).sort("english").exec(function(err, users) {
        if (err) return res.render("index", {err})

        const fieldNames = Object.keys(WordsFieldNames)
        res.render("index", {users, fieldNames})
        
    })
})
*/



app.get('/api', (req, res) => {
    Words.find({}).sort("english").exec(function (err, words) {
        if (err) return res.json({ hata: "hatalı" })
        const fieldNames = Object.keys(WordsFieldNames)
        res.json(words);
    })
})


app.post('/api/ekle', (req, res) => {
    const nwords = new Words({
        turkish: req.body.turkish,
        english: req.body.english,
        polish: req.body.polish,
        spanish: req.body.spanish,
        sentences: req.body.sentences
    })

    nwords.save((err) => {
        if (err) {
            return res.json({ err })
        }

        res.json({ result: "Added" })
        console.log('Added')
    })

})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
