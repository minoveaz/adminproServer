const { response } = require('express')
const  bcrypt  = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt');

const {sendEmail} = require('../services/createAccountEmail.service')

const User = require('../models/user.model')


const getUsers = async ( req, res ) => {

    const from = Number(req.query.from) || 0; 
    console.log(from);
    
    const users = await User.find({}, 'name lastName email role google img')
                            .skip(from)
                            .limit(5);
    const total = await User.countDocuments();

    res.json({
        ok: true, 
        users,
        total,
    })
}


const createUsers = async ( req, res = response ) => {
    
    const { name , lastName, password, email} = req.body;

    try {
        const emailExist = await User.findOne({email});

        if(emailExist){
            return res.status(400).json({
                ok:false,
                msg:'This Email is already registered, please try with a new one'
            })
        }

        const user = new User(req.body);

        // encrypt password

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt)

        // save user in DB
        await user.save()

        // send email to user

        sendEmail(user);


        // generate Token 
        const token = await generateJWT(user.id);
        res.json({
            ok: true, 
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const updateUser = async ( req, res = response) => {
    const uid = req.params.id;
    

    try {

        const userDB = await User.findById(uid);

        if( !userDB){
            return res.status(404).json({
                ok: false,
                msg: 'User does not exist'
            })
        }

        //TODO: Validar token y comprobar que el usuario es correcto
        
        //Update info
        const { password, googleLogin,email, ...fields} = req.body;

        if ( userDB.email !== email){
            const emailexist = await User.findOne({email});
            if ( emailexist ){
                return res.status(400).json({
                    ok:false,
                    msg: 'Cant update to this email,it is already registered'
                });
            }
        }

        fields.email = email;
        //new:true brings the document updated
        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok: true,
            user: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant update the user'
        })
        
    }
}

const deleteUser = async(req, res = response) => {
    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if( !userDB){
            return res.status(404).json({
                ok: false,
                msg: 'User does not exist'
            })
        }

        await User.findByIdAndDelete(uid);


        res.json({
            ok: true,
            msg: 'User deleted'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant Delete the user'
        })
    }

}

module.exports = { 
    getUsers, 
    createUsers, 
    updateUser,
    deleteUser
}


