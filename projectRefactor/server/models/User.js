'use strict';

const mongoose = require('mongoose');

const BCTransactionSchema = require('./BCTransaction');
const BCAccountSchema     = require('./BCAccount');
const BCAccount           = new BCAccountSchema().schema;
const BCTransaction       = new BCTransactionSchema().schema;

let UserSchema = new mongoose.Schema({

    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bcAccount: { type: BCAccount, required: true },
    bcTransactions: [ BCTransaction ],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});

module.exports = mongoose.model('user', UserSchema);
