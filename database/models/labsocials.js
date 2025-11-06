const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labsocialsSchema = new Schema({
    type: String,
    url: String,
});

const LabSocials = mongoose.model('labsocials', labsocialsSchema);
module.exports = LabSocials;
