const Alumni = require('../../../database/models/alumni');

/*
 * API endpoint to return all alumni.
*/
const getAll = async (req, res) => {
    let result = {
        alumni: [],
    };
    console
    try{
        let res = await Alumni.find().lean();
        res.forEach(alumni => {
            result.alumni.push({
                _id: alumni._id,
                name: alumni.preferredName? alumni.preferredName : alumni.name,
                position : alumni.position,
                bio: alumni.bio,
                startAndEndYear: alumni.startAndEndYear,
                acknowledgements: {
                    awards: alumni.acknowledgements.awards,
                    conferences: alumni.acknowledgements.conferences,
                    posters: alumni.acknowledgements.posters,
                    presentations: alumni.acknowledgements.presentations,
                    publications: alumni.acknowledgements.publications,
                    otherAccomplishments: alumni.acknowledgements.otherAccomplishments
                },
                twitter: alumni.socials.twitter,
                linkedIn: alumni.socials.linkedIn,
                image: alumni.image,
                awardsPostBHK: alumni.awardsPostBHK,
                currentPosition:{
                    company: alumni.currentPosition.company,
                    title: alumni.currentPosition.title,
                    industry: alumni.currentPosition.industry,
                    location: alumni.currentPosition.location,
                    description: alumni.currentPosition.description
                }
            })
        })
    }catch(error){
        console.log(error);
    }finally{
        res.send(result);
    }
}

module.exports = {
    getAll,
}