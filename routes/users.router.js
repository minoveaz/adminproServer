/*
    Ruta: /api/users
*/

const { Router} = require('express');
const {check } = require('express-validator')
const { validateField  } = require('../middlewares/validate-field')

const { getUsers, createUsers, updateUser, deleteUser } = require('../controllers/users.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT ,getUsers)

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

router.put('/:id',
    [   validateJWT,
        check('name','Name is obligatory').not().isEmpty(),
        check('lastName','Lastname is obligatory').not().isEmpty(),
        check('password', 'Password is obligatory').not().isEmpty(),
        check('email','Email is obligatory').isEmail(),
        validateField
    ],
    updateUser
)

router.delete('/:id',
    [
        validateJWT,
        check('name','Name is obligatory').not().isEmpty(),
        check('lastName','Lastname is obligatory').not().isEmpty(),
        check('email','Email is obligatory').isEmail(),
        validateField,
    ] ,
    deleteUser)


module.exports = router;