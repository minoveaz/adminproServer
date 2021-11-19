const { response } = require("express");
const Event = require('../models/event.model');
const User = require('../models/user.model');
const Attendee = require('../models/attendee.model');


const getEvent = async( req, res = response) =>{

    const events = await Event.find()
                                .populate('attendees')
                                //.populate('user','name','lastName','email','phoneNumber','img')

    res.json({
        ok: true, 
        events
    })
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
    const open2 = (req.body.open === 'True')


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

const createAttende = async(req,res) => {
    // const uid = req.uid
    const id = req.params.id
    //const newAttende = req.body

    const newAttende = new Attendee({
        ...req.body,
      });

    console.log(newAttende)
    
    try {
        const eventDB = await Event.findById(id)

        // validate if the event exist in the DB
        if(!eventDB){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            }) 
        }
        // validate if there is capacity to add the attendee
        const capacity = eventDB.capacity
        const currentAttendees = eventDB.attendees.lenght
        //const currentAttendees = eventDB.attendees.countDocuments()
        console.log(capacity)
        console.log(currentAttendees)       
        

        
        //const updatedEventAttendee = await Event.findByIdAndUpdate(id, {$push:{attendees: newAttende}}, {new: true})
        
        // save attendee to the Database
        const attendeeDB = await newAttende.save();
        // add attendee to the Event
        eventDB.attendees.push(attendeeDB.id)
        // save attendee to the Event
        await eventDB.save()
        console.log(eventDB)

        res.json({
            ok: true, 
            attendee: updatedEventAttendee,
            msg: 'attendee has bee added to the list',
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant add this attendee'
        })
    }
}

const deleteAttende = async (req,res) => {

}


module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    createAttende,
    deleteAttende
}