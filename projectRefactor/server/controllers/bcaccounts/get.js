'use strict';

const BCAccount = require('../../models/BCAccount');

/*********************************************************************************
* Web service: Get all blockchain user accounts in the database
* URI: /api/user
* Method: GET
*/
let getAll = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    BCAccount.find({}, (err, bcAccounts) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting bcAccounts',
                errors: err
            });

            throw err;
        }

        if (!bcAccounts) return res.status(404).send({
            success: false,
            message: 'There are no bcAccounts available'
        });

        return res.status(200).json({
            success: true,
            message: 'bcAccounts successfully readed',
            bcAccounts: bcAccounts
        });
    });

}
