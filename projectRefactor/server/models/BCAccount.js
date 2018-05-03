'use strict';

const mongoose = require('mongoose');

const BCTransactionSchema = require('./BCTransaction');
const BCTransaction       = new BCTransactionSchema().schema;

let BCAccount = new mongoose.Schema({

    accountHash: { type: String, required: true },
    lastAccounCreatedCounter: { type: Number, required: true },
    transactionsReceived: [ ],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});

module.exports = mongoose.model('bcaccount', BCAccount);
