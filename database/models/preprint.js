const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preprintSchema = new Schema({
    title: String,
    authors: String,
    date: Number,
    doi: String,
    publisher: String,
    image: String,
});

const Preprint = mongoose.model('Preprint', preprintSchema);
module.exports = Preprint;


