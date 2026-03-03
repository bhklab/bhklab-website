const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collaborationSchema = new Schema({
  maincollab: String,
  othercollab: String,
  organization: String,
  country: String,
  startyear: String,
  type: String,
  project: String,
  contact: String,
  members: String,
  role: String,
  status: String,
  outputs: String,
});

const Collaboration = mongoose.model("Collaboration", collaborationSchema);
module.exports = Collaboration;
