const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumniSchema = new Schema({
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
    Socials: {
        twitter: String,
        linkedIn: String,
    },
    image: String,
    awardsPostBHK: String,
    currentPosition:{
        company: String,
        title: String,
        industry: String,
        location: String,
        description: String
    }
},
{ typeKey: '$type' });

const Alumni = mongoose.model('Alumni', alumniSchema);
module.exports = Alumni;

