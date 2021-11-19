const { Schema, model} = require('mongoose');

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
    attendees:{
        type: Schema.Types.ObjectId,
        ref: 'Attendee'
    }
},{ collection: 'events'});

EventSchema.method('toJSON', function() {
    const {_v, ...object} = this.toObject();
    return object;
});


module.exports = model('Event', EventSchema)