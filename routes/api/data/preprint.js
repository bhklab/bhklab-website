const Preprint = require('../../../database/models/preprint');

const getAll = async (req, res) => {
    let result = {
        preprints: [],
    };
	try {
		result.preprints = await Preprint.find().lean();
		res.status(200).send(result);
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: 'Internal Server Error' });
	}
	  
}

module.exports = {
    getAll
}
