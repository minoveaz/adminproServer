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

attendeeSchema.method('toJSON', function() {
    const {_v, _id, password, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Attendee', attendeeSchema)