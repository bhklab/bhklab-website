const Research = require('../../../database/models/research');
const mongoose = require("mongoose");

const getOne = async (req, res) => {
    let result = {
        team: {}
    };
    let token = req.params.token;
    try{
        // Get lab member's info for a given slug
        let res =  await Research.find().lean();
        const research = res.filter(research =>
            research.teams.map(team => team.teamTitle
                .split("/").join("_")
                .split(" ").join("_").toLowerCase()).includes(token)
        )[0]

        const team = research.teams.filter(item => item.teamTitle)
            .filter(item=> item.teamTitle.toLowerCase()
                .split("/").join("_")
                .split(" ").join("_").includes(token))[0];

        if ( team ){
            result.team = {
                title: team.teamTitle,
                url: team.url,
                description: team.teamDesc,
                teamImage: team.teamImage
            }
        }
    }catch(error){
        console.log(error);
    }finally{
        res.send(result);
    }
}

const getAll = async (req, res) => {
    let result = {
        research: [],
    };
    try{
        // Get research in the database
        result.research =  await Research.find().lean();
    }catch(error){
        console.log(error);
    }finally{
        res.send(result);
    }
}

const deleteOne = async (req, res) => {
    let result = {};
    // For a given Id delete a research from the database
    try{
        await Research.deleteOne({_id: mongoose.Types.ObjectId(req.body.id)});
    }catch(err){
        console.log(err);
        result.message = 'An error occurred when deleting the research, please try again.';
        res.status(500);
    }finally{
        res.send(result);
    }
}

module.exports = {
    getAll,
    getOne,
    deleteOne
}
