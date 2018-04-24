'use strict';

const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({

    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});

module.exports = mongoose.model('user', UserSchema);
