const Publication = require('../../../database/models/publication');
const mongoose = require("mongoose");

const getAll = async (req, res) => {
    let result = {
        publications: [],
    };
    try{
        // Get publications in the database
        result.publications =  await Publication.find().populate('projects', 'members').lean();
    }catch(error){
        console.log(error);
    }finally{
        res.send(result);
    }
}

const deleteOne = async (req, res) => {
    let result = {};
    // For a given Id delete a presentation from the database
    try{
        await Publication.deleteOne({_id: mongoose.Types.ObjectId(req.body.id)});
    }catch(err){
        console.log(err);
        result.message = 'An error occurred when deleting the presentation, please try again.';
        res.status(500);
    }finally{
        res.send(result);
    }
}

module.exports = {
    getAll,
    deleteOne
}
