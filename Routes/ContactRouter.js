const express = require('express');
const { createContact, deleteContactById, getRecord } = require('../Controllar/ContactControllar');
const Contactrouter = express.Router();


// POST - Create a new contact
Contactrouter.post('/contacts', createContact);

// GET - Get a single contact by ID
Contactrouter.get('/contacts', getRecord);

// DELETE - Delete a contact by ID
Contactrouter.delete('/contacts/:_id', deleteContactById);

module.exports = Contactrouter;
