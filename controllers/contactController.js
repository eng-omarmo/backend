const asyncHandler = require('express-async-handler');
const contact = require('../models/contactModel');


//  **AllContacts**:
//    - **Method:** GET
//    - **Description:** Retrieves all contacts from the database.
//    - **Response:** Returns a JSON array of all contacts with a status code of 200.

const AllContacts = asyncHandler(async (req, res) => {
    const contacts = await contact.find();
    res.status(200).json(contacts);
});

//  **OneContact**:
//    - **Method:** GET
//    - **Description:** Retrieves a single contact by its ID from the database.
//    - **Parameters:** `id` (contact ID)
//    - **Response:** Returns a JSON object representing the contact if found, with a status code of 200. If the contact is not found, it returns a JSON object with an error message and a status code of 404.
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



//  **UpdateContacts**:
//    - **Method:** PUT
//    - **Description:** Updates a single contact by its ID in the database.
//    - **Parameters:** `id` (contact ID) in the URL, and the updated contact data in the request body.
//    - **Response:** If the contact is successfully updated, it returns a JSON object representing the updated contact with a status code of 200. If the contact is not found, it returns a JSON object with an error message and a status code of 404. If there's an internal server error during the update process, it returns a JSON object with an error message and a status code of 500.


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

// **DeleteContact**:
//    - **Method:** DELETE
//    - **Description:** Deletes a single contact by its ID from the database.
//    - **Parameters:** `id` (contact ID)
//    - **Response:** If the contact is successfully deleted, it returns a JSON object with a success message and a status code of 200. If the contact is not found, it returns a JSON object with an error message and a status code of 404. If there's an internal server error during the deletion process, it returns a JSON object with an error message and a status code of 500.


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
// **CreateContact**:
// - **Method:** POST
// - **Description:** Creates a new contact in the database.
// - **Request Body:** Requires `Id`, `name`, `email`, and `phone` fields.
// - **Response:** If the contact is successfully created, it returns a JSON object representing the new contact with a status code of 201. If any of the mandatory fields (email, name, phone, Id) are missing, it returns a JSON object with an error message and a status code of 400. If the email format is invalid, it returns a JSON object with an error message and a status code of 400. If a contact with the same email already exists, it returns a JSON object with an error message and a status code of 400. If there's an internal server error during the creation process, it returns a JSON object with an error message and a status code of 500.


const CreateContact = asyncHandler(async (req, res) => {
    const { Id, name, email, phone } = req.body;

    if (!email || !name || !phone || !Id) {
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
