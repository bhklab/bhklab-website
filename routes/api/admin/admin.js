const Admin= require('../../../database/models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const checkToken = async (token) => {
    let decoded = null;
    try{
        decoded = jwt.verify(token, process.env.TOKEN);
    }catch(error){
        console.log('invalid token');
    }finally{
        return decoded;
    }
}

const submit = async (req, res) => {
    const {username, password} = req.body;
    let data = null;
    try{
        const found = await Admin.findOne({'username': username.toLowerCase()});
        const match = bcrypt.compareSync(password, found.password);
        if(match){
            data = {
                username: found.username,
                action: 'signin'
            };
            const token = jwt.sign(data, process.env.TOKEN, {expiresIn: '20s'});
            res.cookie('admintoken', token, {httpOnly: true});
        }
    }catch(err){
        console.log(err);
        res.status(500);
    }finally{
        res.send(data);
    }
}

const logout = async (req, res) => {
    const token = jwt.sign({}, 'tempauthenticationstring', {expiresIn: '0'});
    res.cookie('admintoken', token, {httpOnly: true}).status(200).send();
}

const getSession = async (req, res) => {
    let data = null;
    if(req.decoded){
        data = {
            username: req.decoded.username
        };
    }
    res.send(data);
}

module.exports = {
    submit,
    logout,
    checkToken,
    getSession
}
