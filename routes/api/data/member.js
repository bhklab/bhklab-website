const Member = require('../../../database/models/member');
const mongoose = require("mongoose");

/**
 * API endpoint to return all members.
 * URL Parameters:
 * Query parameters:
 * @param {*} req
 * @param {*} res
 */
const getAll = async (req, res) => {
    try{
        const members = await Member.find().lean();
		res.send(JSON.stringify(members));
    }catch(error){
        console.log(error);
    }
}

const getOne = async (req, res) => {
    let result = {
        member: {}
    };
    let token = req.params.token;
    try{
        // Get lab member's info for a given slug
        let res =  await Member.find().lean();
        let member = res.filter(item => item.slug === token)[0];
        if ( member ){
			result = JSON.stringify(member);
        }
    }catch(error){
        console.log(error);
    } finally {
		res.send(result)
	}
}

const addOne = async (req, res) => {
    try{
        const member = req.body;
        // identify the submitter and make sure there is no duplication

        // insert pipeline
        let newMember= new Member(member);
        await newMember.save();

    }catch(error){
        console.log(error);
        res.status(500);
    }finally{
        res.send({});
    }
}


const edit = async (req, res) => {
    // const admin = req.decoded;
    const admin = true;
    try{
        let member = req.body;
        if(admin){
            await Member.updateOne({ '_id': member._id }, member, {upsert: true});
        }
    }catch(error){
        console.log(error);
        res.status(500);
    }finally{
        res.send();
    }
}
/**
 * Since grants are using members information and are shared,
 * Caboodle will handle permanently removing the members from database
 * and on the lab website we only change the member's display status
 * */
const deleteOne = async (req, res) => {
    let result = {};
    // For a given Id change member display to false
    try{
        await Member.updateOne({_id: mongoose.Types.ObjectId(req.body.id)}, {display:false});
        result.message = 'The member has been removed from display.';
    }catch(err){
        console.log(err);
        result.message = 'An error occurred when removing the member, please try again.';
        res.status(500);
    }finally{
        res.send(result);
    }
}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    edit
}
