'use strict';

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const config = require('../../config/config');
const User   = require('../../models/User');

let login = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    User.findOne({ email: req.body.email }, (err, userData) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting user',
                errors: err
            });

            throw err;
        }
            
        if (userData) 
            bcrypt.compare(req.body.password, userData.password, (errH, resH) => {
                if (resH) {
                    // create a token
                    jwt.sign({ userData }, config.secret, { 
                        expiresIn: config.tokenExpiresIn 
                    }, 
                    (errT, token) => {
                        if (errT) {
                            return res.status(500).json({
                                error: true,
                                message: 'Error creating token',
                                errors: errT
                            });

                            throw errT;
                        }
                            

                        return res.status(200).json({
                            success: true,
                            message: 'User authenticated',
                            userData: userData,
                            token: token
                        });
                    });
                }
                else 
                    return res.status(409).json({
                        success: false,
                        message: 'Incorrect password'
                    });
            });
        else 
            return res.status(404).send({
                success: false,
                message: 'The user does not exist'
            });
    });

};

module.exports = login;