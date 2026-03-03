const Collaboration = require("../../../database/models/collaboration");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  let result = {
    collaborations: [],
  };
  try {
    result.collaborations = await Collaboration.find().lean();
  } catch (error) {
    console.log(error);
  } finally {
    console.log(result);
    res.send(result);
  }
};
module.exports = {
  getAll,
};
