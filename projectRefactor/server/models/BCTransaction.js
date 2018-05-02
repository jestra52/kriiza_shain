'use strict';

const mongoose = require('mongoose');

let BCTransaction = new mongoose.Schema({

    transactionInfo: { type: Object, required: true } ,
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});

module.exports = mongoose.model('bctransaction', BCTransaction);
