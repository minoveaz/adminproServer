/* 
Doctors
route: '/api/doctors'

*/

const { Router} = require('express');
const {check } = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateField  } = require('../middlewares/validate-field');

const { getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor } = require('../controllers/doctors.controller')

const router = Router();

router.get('/',getDoctor)

router.post('/',
    [
        validateJWT,
        check('name', 'The Hospital name is required').not().isEmpty(),
        check('lastName', 'The Doctor name is required').not().isEmpty(),
        check('hospital', 'Hospital ID Must be valid').isMongoId(),
        validateField
    ],
    createDoctor
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'The Doctor name is required').not().isEmpty(),
        check('lastName', 'The Doctor Last name is required').not().isEmpty(),
        check('hospital', 'Doctor ID Must be valid').isMongoId(),
        validateField
    ],
    updateDoctor
)

router.delete('/:id',
    [] ,
    deleteDoctor)




module.exports = router;