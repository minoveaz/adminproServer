const { Schema, model} = require('mongoose');


const attendeeSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber:{
        type: String
    },
    status:{
        type: String,
        required: true,
        default: 'Registered'
    },
})




const EventSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    open:{
        type: Boolean,
        required: true,
        default: false
    },
    capacity:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventType:{
        type: String,
        required: true,
    },
    attendees:[attendeeSchema]
},{ collection: 'events'});

EventSchema.method('toJSON', function() {
    const {_v, ...object} = this.toObject();
    return object;
});


module.exports = model('Event', EventSchema)