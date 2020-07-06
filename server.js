const express = require('express')

const app = express()
require('dotenv').config()
const db = require('./db/index')
const Words = require('./model/words')
const WordsFieldNames = require('./model/words').fieldNames
const path = require('path');
const translate = require('@vitalets/google-translate-api');
const fetch = require('node-fetch')
const querystring = require('querystring')
var store = require('store')

app.set('json spaces', 3)
app.set('view engine', 'ejs')

const bodyParser = require("body-parser");
const {
    words
} = require('lodash')
const {
    tr
} = require('@vitalets/google-translate-api/languages')
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
    let {
        page = 1, limit = 30
    } = req.query;
    limit = 20
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

app.get('/api/words/:id', async (req, res) => {
    Words.findById(req.params.id).then((word) => {

        if (word) {
            // Words..
            res.json(word)
        } else {
            res.sendStatus(404);
        }

    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});
app.delete('/api/words/:_id', (req, res) => {
    Words.findByIdAndDelete(req.params._id).then((word) => {
        console.log(word)
        res.send("Word deleted!")
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})
 app.get('/api/words/:lang/:word', function(req, res){
     //example request :http://localhost:3000/api/words/english/equal
    let word = req.params.word;
    let lang = req.params.lang; 
    Words.findOne({[lang] : word}).then((words)=>{      
      console.log(words)
      res.send({words})
    }).catch(err=>{
        if(err){
            throw err;
        }
  }) 
}) 



// app.post('/api/translate', async (req, res) => {
//     tr = req.body.t_turkish
//     let results={}

//  /*    const en = await translate(req.body.turkish, { to: 'en' }).text;
//     console.log(en) */
//     let en = translate(req.body.t_turkish, { to: 'en' }).then(res => {
//         console.log(res.text);
//         console.log(res.from.language.iso);
//         results.en = res.text
//     }).catch(err => {
//         console.error(err);
//     })
//     let pl = translate(req.body.t_turkish, { to: 'pl' }).then(res => {
//         console.log(res.text);
//         console.log(res.from.language.iso);
//         results.pl = res.text
//     }).catch(err => {
//         console.error(err);
//     })
//     let es = translate(req.body.t_turkish, { to: 'es' }).then(res => {
//         console.log(res.text);
//         console.log(res.from.language.iso);
//         results.es = res.text
//     }).catch(err => {
//         console.error(err);
//     })
//     Promise.all([en,pl,es]).then(()=> {
//         res.json(results)
//     })
// })

app.post('/api/translate', async (req, res) => {
    let tr = querystring.escape(req.body.t_turkish)

    let results = {}

    /*    const en = await translate(req.body.turkish, { to: 'en' }).text;
       console.log(en) */
    let en = translateWithYandex('en', tr).then(res => {
        results.en = res.text
    }).catch(err => {
        console.error(err);
    })
    let pl = translateWithYandex('pl', tr).then(res => {

        results.pl = res.text
    }).catch(err => {
        console.error(err);
    })
    let es = translateWithYandex('es', tr).then(res => {

        results.es = res.text
    }).catch(err => {
        console.error(err);
    })
    Promise.all([en, pl, es]).then(() => {
        res.json(results)
    })
})

function translateWithYandex(lang, text) {
    const api = "https://translate.yandex.net/api/v1.5/tr.json/translate"
    const YANDEX_TRANSLATE_API_KEY = "trnsl.1.1.20200217T125754Z.36ca6537bf2e00ae.f2ac4178a4ad097c7d390f22b442929643f7f3b1"

    return fetch(`${api}?key=${YANDEX_TRANSLATE_API_KEY}&lang=${lang}&text=${text}`)
        .then(data => data.json())
}

//translateWithYandex('pl','elma').then(data => console.log(data))


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

function isReplaced(str) {
    new_str = str.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇıIĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "")
    return new_str;
}

app.post('/api/ekle', async (req, res) => {
    if (req.body.turkish == '') {
        return res.status(500).send('Turkish area must filled!')
    } else if (req.body.english == '') {
        return res.status(500).send('English area must filled!')
    } else if (req.body.polish == '') {
        return res.status(500).send('Polish area must filled!')
    } else if (req.body.spanish == '') {
        return res.status(500).send('Spanish area must filled!')
    }
    if (isValid(req.body.turkish) == true && isValid(req.body.english) == true &&
        isValid(req.body.polish) == true && isValid(req.body.spanish) == true) {
        let obj = null
        try {
            obj = await Words.findOne({
                turkish: req.body.turkish,
                english: req.body.english,
                polish: req.body.polish,
                spanish: req.body.spanish
            })
            console.log(obj)
            if (obj != null) {
                throw new Error("Duplicate Row!")
            }
            console.log(obj)
        } catch (err) {
            return res.json({
                "the": "end",
                details: err.message
            })
        }
        const nwords = new Words({
            turkish: req.body.turkish,
            english: req.body.english,
            polish: req.body.polish,
            spanish: req.body.spanish,
            sentences: req.body.sentences
        })
        nwords.save((err) => {
            if (err) {
                return res.json({
                    err
                })
            }
            res.json({
                result: "Added"
            })
            console.log('Added')
        })
    } else {
        return res.status(500).send('Something broke!')
    }
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});