const {response} = require('express')
const User = require('../models/user.model')
const bycrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const login = async (req, res = response) => {

    const { email, password} = req.body;

    const userDb = await User.findOne({email});

    // check email
    if(! userDb ){
        return res.status(404).json({
            ok: false, 
            msg: "Invalid email"
        })
    }

    // check password

    const validatePassword = bycrypt.compareSync(password, userDb.password );
    if (! validatePassword){
        return res.status(400).json({
            ok: false,
            msg: 'Invalid Password'
        })
    }

    // generate JWT Token

    const token = await generateJWT(userDb.id);

    try {
        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

} 

const renewToken = async(req, res = response) =>{

    const uid = req.uid

    // generate JWT Token
    const token = await generateJWT(uid);

    // get the user by UID

    const userDB = await User.findById(uid);

    res.json({
        ok:true,
        token,
        userDB
    })
}

module.exports = {
    login,
    renewToken
}