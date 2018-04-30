'use strict';

const mongoose = require('mongoose');

let BCTransaction = new mongoose.Schema({

    chainAccount: { type: String },
    from: { type: String},

});

module.exports = mongoose.model('bctransaction', BCTransaction);
