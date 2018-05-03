'use strict';

const mongoose = require('mongoose');

let BCTransaction = new mongoose.Schema({

    transactionInfo: {
        transactionOwner: { type: String, required: true },
        to: { type: String, required: true },
        content: { type: Object, required: true } 
    },
    transactionHash: { type: String, required: true },
    parentTransactionHash: { type: String },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});

module.exports = mongoose.model('bctransaction', BCTransaction);
