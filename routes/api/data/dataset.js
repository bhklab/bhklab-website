const Dataset = require('../../../database/models/dataset');
const mongoose = require("mongoose");

const getAll = async (req, res) => {
    let result = {
        datasets: [],
    };
    try{
        // Get datasets stored in the database
        result.datasets =  await Dataset.find().lean();
    }catch(error){
        console.log(error);
    }finally{
        console.log(result)
        res.send(result);
    }
}

const deleteOne = async (req, res) => {
    let result = {};
    // For a given Id delete a dataset from the database
    try{
        await Dataset.deleteOne({_id: mongoose.Types.ObjectId(req.body.id)});
    }catch(err){
        console.log(err);
        result.message = 'An error occurred when deleting the dataset, please try again.';
        res.status(500);
    }finally{
        res.send(result);
    }
}

module.exports = {
    getAll,
    deleteOne
}
