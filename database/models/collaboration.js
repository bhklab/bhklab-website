const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collaborationSchema = new Schema({
  maincollab: String,
  othercollabs: String,
  organization: String,
  country: String,
  city: String,
  startyear: String,
  type: String,
  project: String,
  contact: String,
  members: String,
  role: String,
  status: String,
  outputs: String,
  latitude: Number,
  longitude: Number,
});

const Collaboration = mongoose.model("Collaboration", collaborationSchema);
module.exports = Collaboration;
