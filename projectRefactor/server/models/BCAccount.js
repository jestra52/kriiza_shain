'use strict';

const mongoose = require('mongoose');

let BCAccount = new mongoose.Schema({

    accountHash: { type: String, required: true },
    lastAccounCreatedCounter: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});

module.exports = mongoose.model('bcaccount', BCAccount);
