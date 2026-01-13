const Social = require('../../../database/models/social');
const mongoose = require("mongoose");

const getAll = async (req, res) => {
    let socials = [];
    try{
        // Get socials in the database
        socials =  await Social.find().lean();
        console.log(socials)
        ;
    }catch(error){
        console.log(error);
    }finally{
        res.send(socials);
    }
}

const deleteOne = async (req, res) => {
    let result = {};
    // For a given Id delete a social post from the database
    try{
        await Social.deleteOne({_id: mongoose.Types.ObjectId(req.body.id)});
    }catch(err){
        console.log(err);
        result.message = 'An error occurred when deleting the social post, please try again.';
        res.status(500);
    }finally{
        res.send(result);
    }
}

module.exports = {
    getAll,
    deleteOne
}
