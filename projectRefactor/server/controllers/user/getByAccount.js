'use strict';

const User = require('../../models/User');

/*********************************************************************************
* Web service: Get user by its account passed in headers
* URI: /api/user/byaccount
* Method: GET
*/
let getByAccount = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    console.log("ACCOUNT:", req.headers.bcaccount);
    
    User.findOne({ 'bcAccount.accountHash': req.headers.bcaccount}, 
    (err, userData) => {
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

        return res.status(200).json({
            success: true,
            message: 'User successfully readed',
            userData: userData
        });
    });
    
};

module.exports = getByAccount;
