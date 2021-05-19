/*
    Ruta: /api/login
*/

const { Router} = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth.controller');
const { validateField } = require('../middlewares/validate-field');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.post('/',
    [
        check('email', 'The email is rquired').isEmail(),
        check('password', 'Password is Requied').not().isEmpty(),
        validateField
    ],
    login
)


router.get('/renew',
    validateJWT,
    renewToken
)


module.exports = router