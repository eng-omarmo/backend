const express = require("express");
const router = express.Router();
const {
    UpdateContacts,CreateContact,DeleteContact, OneContact,AllContacts,
}=require('../controllers/contactController.js')

const auth =require('../middleware/validateTokenHandler');

//get all contacts
router.route("/").get(auth,AllContacts).post(auth,CreateContact);

//udpate contact
router.route("/:id").put(auth,UpdateContacts).delete(auth,DeleteContact).get(auth,OneContact);




module.exports = router; // Export the router directly
