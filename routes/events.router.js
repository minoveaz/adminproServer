/* 
Events
route: '/api/events'

*/

const { Router} = require('express');
const {check } = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateField  } = require('../middlewares/validate-field');

const { getEvents, createEvent, updateEvent, deleteEvent, getAttendee, createAttende, deleteAttende} = require('./../controllers/events.controller')

const router = Router();

router.get('/',getEvents)

router.post('/',
    [
        validateJWT,
        check('name', 'The Event name is required').not().isEmpty(),
        check('date', 'The Event date is required').not().isEmpty(),
        check('location', 'The Event location is required').not().isEmpty(),
        check('capacity', 'The Event capacity is required').not().isEmpty(),
        validateField
    ],
    createEvent
);

router.put('/:id', validateJWT, updateEvent)

router.delete('/:id',validateJWT,deleteEvent)


/*------------------------------------------------------------------- attendees----------------------------------------------------------- */
/*---------------------------------------------------------------------------------------------------------------------------------------- */



router.get('/:id/:attendeeid',validateJWT,getAttendee)

router.post('/:id', 
    [
        
        check('name', 'The Attende name is required').not().isEmpty(),
        check('lastName', 'The Attende lastName is required').not().isEmpty(),
        check('email', 'The Attende email is required').isEmail(),
        check('phoneNumber', 'The Attende Phone Number is required').not().isEmpty(),
        validateField
    ], 
    createAttende
);

router.delete('/:id/:attendeeid',validateJWT,deleteAttende)

module.exports = router;