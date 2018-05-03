'use strict';

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const User      = require('../../models/User');
const BCAccount = require('../../models/BCAccount');
const config    = require('../../config/config');

/*********************************************************************************
 * Web service: Create a new user
 * URI: /api/user/create
 * Method: POST
 */
let create = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

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
                        message: 'Error hashing password',
                        errors: errH
                    });

                    throw errH;
                }

                BCAccount.findOne().sort({ 'createdAt': -1 }).exec( (errGT, bcaData) => {
                    if (errGT) {
                        return res.status(500).json({
                            error: true,
                            message: 'Error getting last transaction',
                            errors: errH
                        });
    
                        throw errH;
                    }

                    let bcaToCreate = new BCAccount();
                    let lastAccounCreatedCounter = 1;
                    
                    if (bcaData && bcaData.lastAccounCreatedCounter) {
                        
                        if (bcaData.accountHash == req.body.bcAccount) 
                            return res.status(409).json({
                                success: false,
                                message: `Account ${bcaData.accountHash} is already registered`
                            });
                        
                        lastAccounCreatedCounter += bcaData.lastAccounCreatedCounter;
                    }

                    bcaToCreate.accountHash              = req.body.bcAccount;
                    bcaToCreate.lastAccounCreatedCounter = lastAccounCreatedCounter;
                    bcaToCreate.createdAt                = date.toISOString();
                    bcaToCreate.updatedAt                = date.toISOString();

                    bcaToCreate.save((errbca, bcaStored) => {
                        if (errbca) {
                            return res.status(500).json({
                                error: true,
                                message: 'Error creating bcAccount',
                                errors: errbca
                            });
        
                            throw errbca;
                        }

                        // Setting schema attributes
                        userToCreate.email     = req.body.email;
                        userToCreate.password  = hashedPassword;
                        userToCreate.firstName = req.body.firstName;
                        userToCreate.lastName  = req.body.lastName;
                        userToCreate.bcAccount = bcaStored;
                        userToCreate.createdAt = date.toISOString();
                        userToCreate.updatedAt = date.toISOString();
                        
                        userToCreate.save((errS, userStored) => {
                            if (errS) {
                                return res.status(500).json({
                                    error: true,
                                    message: 'Error creating user',
                                    errors: errS
                                });
            
                                throw errS;
                            }

                            jwt.sign({ userStored }, config.secret, { 
                                expiresIn: config.tokenExpiresIn 
                            }, 
                            (errT, token) => {
                                return res.status(200).json({
                                    success: true,
                                    message: 'User successfully created',
                                    userStored: userStored,
                                    token: token
                                });
                            });
                        });

                    });

                });
            });            
        }
    });

};

module.exports = create;
