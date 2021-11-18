const { response } = require("express");
const Event = require('../models/event.model')
const User = require('../models/user.model')


const getEvent = async( req, res = response) =>{

    const events = await Event.find()
                                .populate('event','name','img')
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
    const uid = req.uid
    const id = req.params.id
    const newAttende = req.body

    try {
        const eventDB = await Event.findById(id)

        if(!eventDB){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            }) 
        }

        console.log(newAttende)
        const updatedEventAttendee = await Event.findByIdAndUpdate(id, {$push:{attendees: newAttende}}, {new: true})

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


module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    createAttende
}