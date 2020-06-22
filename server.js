const express = require('express')

const app = express()
require('dotenv').config()
const db = require('./db/index')
const Words = require('./model/words')
const WordsFieldNames = require('./model/words').fieldNames
const path = require('path');
const translate = require('@vitalets/google-translate-api');
var store = require('store')

app.set('json spaces', 3)
app.set('view engine', 'ejs')

const bodyParser = require("body-parser");
const { words } = require('lodash')
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




/* app.get('/api', (req, res) => {
    Words.find({}).sort("english").exec(function (err, words) {
        if (err) return res.json({ hata: "hatalı" })
        const fieldNames = Object.keys(WordsFieldNames)
        res.json(words);
    })
}) */
app.get('/api', async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 100 } = req.query;
    const fieldNames = Object.keys(WordsFieldNames)
    try {
        // execute query with page and limit values
        const words = await Words.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // get total documents in the Posts collection 
        const count = await Words.countDocuments();

        // return response with posts, total pages, and current page
        res.json({
            words,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err.message);
    }
});

let en;
let tr;
let pl;
let es;
app.post('/api/translate', (req, res) => {
    tr = req.body.t_turkish
    translate(req.body.turkish, { to: 'en' }).then(res => {
        console.log(res.text);
        console.log(res.from.language.iso);
        en = res.text
    }).catch(err => {
        console.error(err);
    })
    translate(req.body.t_turkish, { to: 'pl' }).then(res => {
        console.log(res.text);
        console.log(res.from.language.iso);
        pl = res.text
    }).catch(err => {
        console.error(err);
    })
    translate(req.body.t_turkish, { to: 'es' }).then(res => {
        console.log(res.text);
        console.log(res.from.language.iso);
        es = res.text
    }).catch(err => {
        console.error(err);
    })

    res.json({ Message: "Translated!" })
})
app.get('/api/translate', (req, res) => {
    res.json({ translated_en: en, translated_pl: pl, translated_es: es })
})

/* function googleTranslate(t_word) {
    kelime = t_word
    console.log(kelime)
    googleTranslate2()
    return t_word
}
function googleTranslate2() {
    console.log(kelime)
    return kelime
} */

function hasNumbers(t) {
    var regex = /\d/g;
    return regex.test(t);
}
function isValid(str) {
    new_str = str.match(/[^A-Za-z-ğüşöçİĞÜŞÖÇıIĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi)
    if (new_str === null) {
        return true;
    }
    return false;
}

app.post('/api/ekle', (req, res) => {
    if (req.body.turkish == '') {
        return res.status(500).send('Turkish area must filled!')
    }
    else if (req.body.english == '') {
        return res.status(500).send('English area must filled!')
    }
    else if (req.body.polish == '') {
        return res.status(500).send('Polish area must filled!')
    }
    else if (req.body.spanish == '') {
        return res.status(500).send('Spanish area must filled!')
    }
    if (isValid(req.body.turkish) == true && isValid(req.body.english) == true &&
        isValid(req.body.polish) == true && isValid(req.body.spanish) == true) {
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
    }
    else {
        return res.status(500).send('Something broke!')
    }
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
