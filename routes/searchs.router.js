/*
    Ruta: /api/searchAll/:search
*/

const { Router} = require('express');

const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateField } = require('../middlewares/validate-field');

const { getSearchAll, getDataCollection } = require('../controllers/searchs.controller')


const router = Router();

router.get('/:search',
    [
        validateJWT,
        check('search', 'The search parameter is required').not().isEmpty(),
        validateField
    ],
    getSearchAll
);

router.get('/collection/:table/:search',validateJWT,getDataCollection)

module.exports = router

