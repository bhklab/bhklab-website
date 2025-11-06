const LabSocials = require('../../../database/models/labsocials');

// Get Social links from the database
const getAll = async (req, res) => {
	let labSocials = []
    try {
        labSocials =  await LabSocials.find().lean();
		console.log(labSocials);
    }catch(error){
        console.log(error);
    }finally{
        res.send(labSocials);
    }
}

const insertOne = async (req, res) => {

}

module.exports = {
    getAll,
	insertOne,
}