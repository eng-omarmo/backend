const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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