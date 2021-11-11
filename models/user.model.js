const { Schema, model} = require('mongoose');

const userSchema = Schema({
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
    password: {
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    googleLogin:{
        type: Boolean,
        default: false
    },
});

userSchema.method('toJSON', function() {
    const {_v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', userSchema)


