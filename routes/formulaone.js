const express = require('express')
const router = express.Router()
const Formula = require('../models/formula');

// Multer - nødvendig aht håndtering af filer/images
// huske npm i multer
const multer = require('multer');

const upload = multer({

    storage: multer.diskStorage({

        destination: function (req, file, cb) { //cb = callback
            cb(null, 'public/images/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }

    })
});


// ----- Getting all - GET http://localhost:3005/formulaone --------------------------------------
router.get('/', async (req, res) => {

    try {
        const formulas = await Formula.find()
        res.json(formulas)

    } catch (err) {
        res.status(500).json({ message: "FEJL! " + err.messag });  // 500 = serverproblem
    }

});


// ----- Hent udvalgt formula ud fra ID - GET /8848http://localhost:3005/formulaone/717171 (Det er er next) --------------------------------------
router.get('/:id', getFormula, (req, res) => {
    res.json(res.formula);
});



// ----- Creating One - POST http://localhost:3005/formulaone/ ---------------------------------------
// ----- skal modtage "billede" (filen) og "formula" (data - name + teams)  ---------------------------------------
//post - brugen den når du teste den på Postman med billede.
router.post('/', upload.single('billede'), async (req, res) => {


    // Gem den nye formula:
    try {

       // "formula": "{\"name\":  \"Strand og\", \"teams\": \"alfa\"}"
        let f = JSON.parse(req.body.formula);

        const postedformula = new Formula({

            name: f.name,
            teams: f.teams,
            number: f.number,
            conutry: f.conutry,
            place: f.place,
            birthday: f.birthday,
            podiums: f.podiums,
            points: f.points,
            grandsprix: f.grandsprix,
            championships: f.championships,
            race: f.race,
            gridposition: f.gridposition,
            biography: f.biography,
            coverbillede: { filnavn: req.file.filename }

        });

        const oprettetformula = await postedformula.save()
        res.status(201).json(oprettetformula)

    } catch (err) {

        res.status(404).json({ message: "FEJL! " + err.message });
    }

});


//post2 - brugen den når du teste den på rest-file uden billede.
// router.post('/', async (req, res) => {
//     // Gem den nye formula:
//     try {
//         const postedformula = new Formula({
//             name: req.body.name,
//             teams: req.body.teams,
//             number: req.body.number,
//             conutry: req.body.conutry,
//             place: req.body.place,
//             birthday: req.body.birthday,
//             podiums: req.body.podiums,
//             points: req.body.points,
//             grandsprix: req.body.grandsprix,
//             championships: req.body.championships,
//             race: req.body.race,
//             gridposition: req.body.gridposition,
//             biography: req.body.biography,
            
//         });
//         const oprettetformula = await postedformula.save()
//         res.status(201).json(oprettetformula)
//     } catch (err) {
//         res.status(404).json({ message: "FEJL! " + err.message });
//     }
// });


// ----- Updating One - PATCH ----------------------------------------
router.patch('/:id', upload.single('billede'), getFormula, async (req, res) => {

    try {

        // "formula": "{\"name\":  \"Strand og\", \"number\": \"alfa\"}"
        let f = JSON.parse(req.body.formula);

        // name
        if (f.name != null) {
            res.formula.name = f.name;
        }

        // teams
        if (f.teams != null) {
            res.formula.teams = f.teams;
        }

        // number
        if (f.number != null) {
            res.formula.number = f.number;
        }

        // conutry
        if (f.conutry != null) {
            res.formula.conutry = f.conutry;
        }

        // place
        if (f.place != null) {
            res.formula.place = f.place;
        }

        // birthday
        if (f.birthday != null) {
            res.formula.birthday = f.birthday;
        }

        // podiums
        if (f.podiums != null) {
            res.formula.podiums = f.podiums;
        }

        // points
        if (f.points != null) {
            res.formula.points = f.points;
        }

        // grandsprix
        if (f.grandsprix != null) {
            res.formula.grandsprix = f.grandsprix;
        }

        // championships
        if (f.championships != null) {
            res.formula.championships = f.championships;
        }

        // race
        if (f.race != null) {
            res.formula.race = f.race;
        }

        // gridposition
        if (f.gridposition != null) {
            res.formula.gridposition = f.gridposition;
        }


        // Hvis der er en fil med i requested...så er der uploadet ny fil af multer - og dermed nyt filnavn
        if (req.file) {
            res.formula.coverbillede = { filnavn: req.file.filename }
        }


        const rettetformula = await res.formula.save();
        res.status(200).json(rettetformula); // send rettede data med retur - så der kan kontrolleres eller ??

    } catch (err) {

        res.status(404).json({ message: "FEJL! " + err.message });
    }
});


// ----- Deleting One - Delete -----------------------------------------
router.delete('/:id', getFormula, async (req, res) => {

    // try {
    //     await res.car.remove()
    //     res.json({ message: 'Citatet er nu slette' })

    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }

});


// ----- Add async await -------------------------------------
// Find formula ud fra id - middleware function - slår cartoon ud fra id (bruges af hent-udvalgt, opret, ret)
async function getFormula(req, res, next) {

    let udvalgtformula;

    try {

        udvalgtformula = await Formula.findById(req.params.id);

        if (udvalgtformula == null) {
            return res.status(404).json({ message: 'Der findes ikke et formula med den id' });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "FEJL " + err.message });
    }

    res.formula = udvalgtformula; // Put den fundne cartoon i responset - så det findes
    next();  // fortsæt med "næste step" efter middleware
}


module.exports = router