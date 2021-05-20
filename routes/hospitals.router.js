/* 
Hospitals
route: '/api/hospitals'

*/

const { Router} = require('express');
const {check } = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateField  } = require('../middlewares/validate-field');

const { getHospital, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital.controller')

const router = Router();

router.get('/',getHospital)

router.post('/',
    [
        validateJWT,
        check('name', 'The Hospital name is required').not().isEmpty(),
        validateField
    ],
    createHospital
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'The Hospital name is required').not().isEmpty(),
        validateField
    ],
    updateHospital
)

router.delete('/:id',
    [
        validateJWT  
    ] ,
    deleteHospital)




module.exports = router;