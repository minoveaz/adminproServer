/*
    Ruta: /api/login
*/

const { Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateField } = require('../middlewares/validate-field');


const router = Router();

router.post('/',
    [
        check('email', 'The email is rquired').isEmail(),
        check('password', 'Password is Requied').not().isEmpty(),
        validateField
    ],
    login
)



module.exports = router