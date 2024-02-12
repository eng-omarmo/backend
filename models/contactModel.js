const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    Id: {
        type: Number,
        required: [true, 'please enter the contact Name']
    },
    name: {
        type: String,
        required: [true, 'please enter the contact Name']
    },
    email: {
        type: String,
        required: [true, 'please enter the contact Email']
    },
    phone: {
        type: String,
        required: [true, 'please enter the contact Phone']
    }
}, {
    timestamp: true,
});

module.exports = mongoose.model('contact', contactSchema);