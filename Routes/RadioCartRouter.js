const express = require('express');
const { createRecord, getAllRecords, getRecordById, deleteRecord } = require('../Controllar/RadioCartControllar');
const RadioCartrouter = express.Router();


RadioCartrouter.post('/radio-cart', createRecord);
RadioCartrouter.get('/radio-cart', getAllRecords);
RadioCartrouter.get('/radio-cart/:_id', getRecordById);
// RadioCartrouter.put('/radio-cart/:id', updateRecord);
RadioCartrouter.delete('/radio-cart/:_id', deleteRecord);

module.exports = RadioCartrouter;
