const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialSchema = new Schema({
    platform: String,
    url: String,
    credentials: String,
    id: String
});

const Social = mongoose.model('Social', socialSchema);
module.exports = Social;
