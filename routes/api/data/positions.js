const Positions = require('../../../database/models/position');
const mongoose = require("mongoose");

const getAll = async (req, res) => {
    let result = {
        positions: [],
    };
    try{
        // Get positions stored in the database which their content is not null
        let positions =  await Positions.find({$expr: { $gt: [{ $strLenCP: '$title' }, 0] }}).lean();
        positions.forEach(item => {
            if(item.active)
                result.positions.push(item)
        })
    }catch(error){
        console.log(error);
    }finally{
        res.send(result);
    }
}

const deleteOne = async (req, res) => {
    let result = {};
    // For a given Id delete a position from the database
    try{
        await Positions.deleteOne({_id: mongoose.Types.ObjectId(req.body.id)});
    }catch(err){
        console.log(err);
        result.message = 'An error occurred when deleting the position, please try again.';
        res.status(500);
    }finally{
        res.send(result);
    }
}

module.exports = {
    getAll,
    deleteOne
}
