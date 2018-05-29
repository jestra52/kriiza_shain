'use strict';

const Hash = require('../../models/Hash');
const User = require('../../models/User');

let create = (req, res) => {

    User.findById(req.params.id, (err, userData) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting user',
                errors: err
            });

            throw err;
        }

        if (!userData) return res.status(404).json({
            success: false,
            message: 'There are no users available'
        });
        else {

            let newHash = new Hash();
            // Setting actual time
            let date = new Date();
            let offset = date.getTimezoneOffset();
            date.setMinutes(date.getMinutes() - offset);

            newHash.txHash = req.body.txHash;
            newHash.actualOwner = userData.firstName + ' ' + userData.lastName;
            newHash.actualOwnerId = req.params.id;
            newHash.history.push(userData.firstName + ' ' + userData.lastName);
            newHash.createdAt = date.toISOString();
            newHash.updatedAt = date.toISOString();

            newHash.save((errS, hashSaved) => {
                if (errS) {
                    return res.status(500).json({
                        error: true,
                        message: 'Error creating hash',
                        errors: errS
                    });

                    throw errS;
                }

                return res.status(200).json({
                    success: true,
                    message: 'Hash successfully created',
                    hashCreated: hashSaved
                });
            });

        }
    });

};

module.exports = create;
