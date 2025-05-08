const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: String,
    preferredName: String,
    position: String,
    supervisor: String,
    bio: String,
    status: String,
    startYear: Date,
    display: Boolean,
    acknowledgements: {
        awards: String,
        conferences: String,
        posters: String,
        presentations: String,
        publications: String,
        otherAccomplishments: String
    },
    contactInfo: {
        uhnOrUofTEmail: String,
        personalEmail: String,
        preferredEmail: String
    },
    socials: {
        twitter: String,
        linkedIn: String,
		bluesky: String
    },
    image: String,
},
{ typeKey: '$type' });

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;