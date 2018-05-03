'use strict';

const User      = require('../../models/User');
const BCAccount = require('../../models/BCAccount');

/*********************************************************************************
* Web service: Get account by its user ID
* URI: /api/bcaccount/:userid
* Method: GET
*/
let getAccountByID = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

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
            message: 'The user does not exist'
        });
        else {

            BCAccount.findById(userData.bcAccount._id, (errAc, accountData) => {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        message: 'Error getting user',
                        errors: err
                    });
        
                    throw err;
                }
    
                return res.status(200).json({
                    success: true,
                    message: 'User and account successfully readed',
                    accountData: accountData
                });
            });

        }
    });
    
};

module.exports = getAccountByID;
