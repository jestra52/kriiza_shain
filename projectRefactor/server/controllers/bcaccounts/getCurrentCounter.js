'use strict';

const BCAccount = require('../../models/BCAccount');

/*********************************************************************************
* Web service: Get the number of blockchain user accounts in the database
* URI: /api/user/bcaccounts/currentCounter
* Method: GET
*/
let getCurrentCounter = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    BCAccount.findOne().sort({ 'createdAt': -1 }).exec((err, bcAccounts) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting bcAccounts',
                errors: err
            });

            throw err;
        }

        if (!bcAccounts) return res.status(404).send({
            currentCounter: 0,
            success: false,
            message: 'There are no bcAccounts available'
        });

        return res.status(200).json({
            success: true,
            message: 'bcAccounts successfully readed',
            currentCounter: bcAccounts.lastAccounCreatedCounter
        });
    });

};

module.exports = getCurrentCounter;
