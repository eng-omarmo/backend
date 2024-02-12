const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please add username'],
    },

    email: {
        type: String,
        required: [true, 'please add your email '],
        unique: [true, 'This Enail is already taken'],
    },


    password: {
        type: String,
        required: [true, 'please add your password '],

    },
},
    {
        timestamp: true,
    }


)


module.exports = mongoose.model('User', userSchema);