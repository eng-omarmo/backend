const asyncHandler = require('express-async-handler');
const contact = require('../models/contactModel');

const AllContacts = asyncHandler(async (req, res) => {
    const contacts = await contact.find();
    res.status(200).json(contacts);
});

const OneContact = asyncHandler(async (req, res) => {
    try {
        const contactId = req.params.id;
        const foundContact = await contact.findById(contactId);
        if (!foundContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json(foundContact);
    } catch (error) {
        console.error('Error retrieving contact:', error);
        res.status(500).json({ error: 'Unable to retrieve contact', message: error.message });
    }
});

const UpdateContacts = asyncHandler(async (req, res) => {
    try {
        const contactId = req.params.id;
        const updatedContact = await contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!updatedContact) {
             return res.status(404).json({ error: "Contact not found" });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const DeleteContact = asyncHandler(async (req, res) => {
    try {
        const contactId = req.params.id;
        console.log(contactId);
        const deletedContact = await contact.findByIdAndDelete(contactId);
        console.log(deletedContact);
        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'Unable to delete contact', message: error.message });
    }
});

const CreateContact = asyncHandler(async (req, res) => {
    const {Id, name, email, phone} = req.body;

    if (!email || !name || !phone ||!Id) {
        return res.status(400).json({ error: 'Email, name, and phone are mandatory fields' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const foundEmail = await contact.findOne({ email });
        if (foundEmail) {
            return res.status(400).json({ error: 'Contact with the same email already exists' });
        }

        const newContact = await contact.create({ Id, name, email, phone });
        return res.status(201).json(newContact);
    } catch (error) {
        console.error('Error creating contact:', error);
        return res.status(500).json({ error: 'Unable to create contact', message: error.message });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = {
    AllContacts,
    OneContact,
    UpdateContacts,
    DeleteContact,
    CreateContact,
};
