'use strict';

const mongoose = require('mongoose');

let Hash = new mongoose.Schema({

    txHash: { type: String, required: true},
    actualOwner: { type: String, required: true },
    actualOwnerId: { type: String, required: true },
    history: [ String ],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});

module.exports = mongoose.model('hash', Hash);
