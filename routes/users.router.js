/*
    Ruta: /api/users
*/

const { Router} = require('express');
const {check } = require('express-validator')
const { validateField  } = require('../middlewares/validate-field')

const { getUsers, createUsers, updateUser, deleteUser } = require('../controllers/users.controller')

const router = Router();

router.get('/', getUsers)

router.post('/',
    [
        check('name','Name is obligatory').not().isEmpty(),
        check('lastName','Lastname is obligatory').not().isEmpty(),
        check('password', 'Password is obligatory').not().isEmpty(),
        check('email','Email is obligatory').isEmail(),
        validateField
    ],
    createUsers
);

router.delete('/:id',
    [
        check('name','Name is obligatory').not().isEmpty(),
        check('lastName','Lastname is obligatory').not().isEmpty(),
        check('email','Email is obligatory').isEmail(),
        validateField
    ] ,
    deleteUser)


module.exports = router;