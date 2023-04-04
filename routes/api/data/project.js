const Project = require('../../../database/models/project');

const getAll = async (req, res) => {
    let result = {
        projects: [],
    };
    try{
        // Get project in the database
        result.projects =  await Project.find().lean();
    }catch(error){
        console.log(error);
    }finally{
        res.send(result);
    }
}

module.exports = {
    getAll
}
