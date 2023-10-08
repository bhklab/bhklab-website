const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presentationSchema = new Schema({
    title: String,
    event: String,
	location: String,
    date: String,
    url: String,
    format: String,
    image: String,
});

const Presentation = mongoose.model('Presentation', presentationSchema);
module.exports = Presentation;
