'use strict';

const Hash = require('../../models/Hash');
const User = require('../../models/User');

let update = (req, res) => {

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

            Hash.findById(req.body.hashId, (errH, hashData) => {
                if (errH) {
                    return res.status(500).json({
                        error: true,
                        message: 'Error getting hash',
                        errors: errH
                    });
        
                    throw errH;
                }
        
                if (!hashData) return res.status(404).json({
                    success: false,
                    message: 'There are no hashes available'
                });
                else {

                    // Setting actual time
                    let date = new Date();
                    let offset = date.getTimezoneOffset();
                    date.setMinutes(date.getMinutes() - offset);

                    hashData.actualOwnerId = req.params.id;
                    hashData.actualOwner = userData.firstName + ' ' + userData.lastName;
                    hashData.history.push(userData.firstName + ' ' + userData.lastName);
                    hashData.updatedAt = date.toISOString();

                    Hash.findByIdAndUpdate(req.body.hashId, hashData, (errUH, hashUpdated) => {
                        if (errUH) {
                            return res.status(500).json({
                                error: true,
                                message: 'Error updating hash',
                                errors: errUH
                            });
                
                            throw errUH;
                        }

                        return res.status(200).json({
                            success: true,
                            message: 'Hash successfully updated'
                        });
                    });

                }
            });
            
        }
    });

};

module.exports = update;
