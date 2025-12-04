const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
    title: String,
    authors: String,
    year: Number,
    url: String,
    publisher: String,
    date: String,
    image: String,
	doi: String,
});

const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;


