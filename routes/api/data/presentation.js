const Presentation = require('../../../database/models/presentation');
const mongoose = require("mongoose");

const getAll = async (req, res) => {
    let result = {
        presentations: [],
    };
    try{
        result.presentations =  await Presentation.find().lean();
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
        await Presentation.deleteOne({_id: mongoose.Types.ObjectId(req.body.id)});
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
