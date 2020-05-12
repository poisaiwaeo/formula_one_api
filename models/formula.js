const mongoose = require('mongoose');

// Vi kan genbruge imgSchema når den står her oppe.
const imgSchema = new mongoose.Schema(
    {
        filnavn: {
            type: String,
            required: true
        },
        imgbeskrivelse: {
            type: String
        }
    }
);

const formulaSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    teams: {
        type: String,
        required: true
    },
    number: {
      type: String,
      required: true
    },
    conutry: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    birthday: {
      type: String,
      required: true
    },
    podiums: {
      type: String,
      required: true
    },
    points: {
      type: String,
      required: true
    },
    grandsprix: {
      type: String,
      required: true
    },
    championships: {
      type: String,
      required: true
    },
    race: {
      type: String,
      required: true
    },
    gridposition: {
      type: String,
      required: true
    },
    coverbillede: imgSchema
}, { timestamps: true })

module.exports = mongoose.model('Formula', formulaSchema, 'formulacol');