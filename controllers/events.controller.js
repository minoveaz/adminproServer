const { response } = require("express");
const Event = require('../models/event.model');
const User = require('../models/user.model');




const getEvents = async( req, res = response) =>{

    const events = await Event.find()
                                //populate('attendees')
                                //.populate('user','name','lastName','email','phoneNumber','img')

    res.json({
        ok: true, 
        events
    })
}


const getEventAttendees = async( req, res = response) =>{
    const eventId = req.params.id
    console.log(eventId)
    try {
        
        const eventDB =  await Event.findById(eventId)
        console.log(eventDB)
        if(!eventDB){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            }) 
        }

        attendees = eventDB.attendees
        eventData = eventDB
        
        console.log(attendees)

        res.json({
            ok: true, 
            msg: 'Attendees List',
            attendees,
            eventData
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Contact with the Administrator",
          });
    }   
}


const createEvent = async (req,res) => {
    const uid = req.uid;
    const event = new Event({
        user: uid,
        ...req.body,
      });

    try {
      const eventDB = await event.save();
      res.json({
        ok: true,
        event: eventDB,
        msg: 'Evento Creado'
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Contact with the Administrator",
      });
    } 
}

const updateEvent = async ( req, res) => {
    const id = req.params.id; 
    const uid = req.uid
    const open2 = (req.body.open === 'true')


    try {
        const eventDB = await Event.findById(id)

        if(!eventDB){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            }) 
        }
    
        const { open, ...fields} = req.body

        fields.open = open2

        const updatedEvent = await Event.findByIdAndUpdate(id, fields, {new: true})

        res.json({
            ok: true, 
            msg: 'Event Updated',
            event: updatedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant update this Event'
        })
    }
}


const deleteEvent = async (req, res) => {
    const id = req.params.id;

    try {

        const eventDB = await Event.findById(id);

        if(!eventDB){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            }) 
        }

        await Event.findByIdAndDelete(id)

        res.json({
            ok: true, 
            msg: 'Event Deleted',
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant delete this Event'
        })
    }
}

/*------------------------------------------------------------------- attendees----------------------------------------------------------- */
/*---------------------------------------------------------------------------------------------------------------------------------------- */


const getAttendee = async( req, res = response) =>{
    const eventId = req.params.id
    const attendeeId = req.params.attendeeid

    try {
        
        const eventDB = await (await Event.findById(eventId)).populate('attendees')

        if(!eventDB){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            }) 
        }

        attendeesList = eventDB.attendees
        
        const attendee = attendeesList.find( attendee => attendee.id === attendeeId)

        if(!attendee){
            return res.status(404).json({
                ok: false,
                msg: 'Atteende does not exist in this Event'
            }) 
        }

        res.json({
            ok: true, 
            msg: 'Ateendee Finded',
            attendee
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Contact with the Administrator",
          });
    }
    
    
}

const createAttende = async(req,res) => {
    // const uid = req.uid
    const eventid = req.params.id
    const newAttende = req.body
    
    try {
        const eventDB = await Event.findById(eventid)

        // validate if the event exist in the DB
        if(!eventDB){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            }) 
        }
        // validate if there is capacity to add the attendee
        const capacity = eventDB.capacity
        const currentAttendees = eventDB.attendees.length
        const availableTickets = capacity - currentAttendees
        
        if(availableTickets <= 0 ){
            return res.status(404).json({
                ok: false,
                msg: 'No Tickets Available',
                availableTickets
            })
        }

        // add attendee to the Event    
        const updatedEventAttendee = await Event.findByIdAndUpdate(eventid, {$push:{attendees: newAttende}}, {new: true})
        
        res.json({
            ok: true, 
            msg: 'attendee has bee added to the list',
            availableTickets
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant add this attendee',
        })
    }
}

const updateAttende = async (req,res) => {
    const eventId = req.params.id
    const attendeeId = req.params.attendeeid

    try {
        
        const eventDB =  (await Event.findById(eventId)).populate('attendees')

        if(!eventDB){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            }) 
        }

        attendeesList = eventDB.attendees
        
        const attendee = attendeesList.find( attendee => attendee.id === attendeeId)

        if(!attendee){
            return res.status(404).json({
                ok: false,
                msg: 'Atteende does not exist in this Event'
            }) 
        }

        const status = req.body.status
        
        attendee.status = status

        const updatedAttendee = await eventDB.save()

        res.json({
            ok: true, 
            msg: 'Ateendee Updated',
            updatedAttendee,
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Contact with the Administrator",
          });
          console.log(error)
    }

}

const deleteAttende = async (req,res) => {
    
    const eventId = req.params.id
    const attendeeId = req.params.attendeeid

    try {
        
        const eventDB = await (await Event.findById(eventId)).populate('attendees')

        if(!eventDB){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            }) 
        }

        attendeesList = eventDB.attendees
        
        const attendee = attendeesList.find( attendee => attendee.id === attendeeId)

        if(!attendee){
            return res.status(404).json({
                ok: false,
                msg: 'Atteende does not exist in this Event'
            }) 
        }

        const updatedEventAttendee = await Event.findByIdAndUpdate(eventId, {$pull:{attendees: attendee}}, {new: true})
        
        res.json({
            ok: true, 
            msg: 'Ateendee Deleted',
            
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Contact with the Administrator",
          });
    }
}


module.exports = {
    getEvents,
    getEventAttendees,
    createEvent,
    updateEvent,
    deleteEvent,
    getAttendee,
    createAttende,
    updateAttende,
    deleteAttende
}