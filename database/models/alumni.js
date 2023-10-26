const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumniSchema = new Schema({
    name: String,
    preferredName: String,
    position: String,
    bio: String,
    status: String,
    startDate: Date,
    endDate: Date,
    slug: String,
    links: [{
        type: String,
        link: String
    }],
    image: String,
    display: Boolean,
	twitter: String,
	linkedIn: String,
    contactInfo: [{
        emailType: String,
        type: String,
        preferred: Boolean
    }]
},
{ typeKey: '$type' });

const Alumni = mongoose.model('Member', alumniSchema);
module.exports = Alumni;


