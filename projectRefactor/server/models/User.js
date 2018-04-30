'use strict';

const mongoose = require('mongoose');

const BCTransaction = require('./BCTransaction');

let UserSchema = new mongoose.Schema({

    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    chainInfo: [ BCTransaction ],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});

module.exports = mongoose.model('user', UserSchema);
