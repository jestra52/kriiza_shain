'use strict';

const bcrypt = require('bcrypt');

const User = require('../../models/User');

/*********************************************************************************
 * Web service: Create a new user
 * URI: /api/user/create
 * Method: POST
 */
let create = (req, res) => {

    User.findOne({ email: req.body.email }, (errF, userFound) => {
        if (errF) {
            return res.status(500).json({
                error: true,
                message: 'Error getting user',
                errors: errF
            });

            throw errF;
        }
        if (userFound) return res.status(409).json({
            success: false,
            message: `Email ${userFound.email} is already registered`
        });
        else {
            let userToCreate = new User();

            // Setting actual time
            let date = new Date();
            let offset = date.getTimezoneOffset();
            date.setMinutes(date.getMinutes() - offset);

            // Hashing password
            let saltRounds = 12;
            bcrypt.hash(req.body.password, saltRounds, (errH, hashedPassword) => {
                if (errH) {
                    return res.status(500).json({
                        error: true,
                        message: 'Error hashing passowrd',
                        errors: errH
                    });

                    throw errH;
                }

                // Setting schema attributes
                userToCreate.username      = req.body.username;
                userToCreate.email         = req.body.email;
                userToCreate.password      = hashedPassword;
                userToCreate.firstName     = req.body.firstName;
                userToCreate.lastName      = req.body.lastName;
                userToCreate.chainAccount  = req.body.chainAccount;
                userToCreate.createdAt     = date.toISOString();
                userToCreate.updatedAt     = date.toISOString();
                
                userToCreate.save((errS, userStored) => {
                    if (errS) {
                        return res.status(500).json({
                            error: true,
                            message: 'Error creating user',
                            errors: errS
                        });
    
                        throw errS;
                    }
    
                    return res.status(200).json({
                        success: true,
                        message: 'User successfully created',
                        userStored: userStored
                    });
                });
            });            
        }
    });

};

module.exports = create;
