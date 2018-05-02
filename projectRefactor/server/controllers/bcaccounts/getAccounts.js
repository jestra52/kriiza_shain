'use strict';

const BCAccount = require('../../models/BCAccount');
const User      = require('../../models/User');

/*********************************************************************************
* Web service: Get all accounts from blockchain user accounts in the database
* URI: /api/bcaccounts
* Method: GET
*/
let getAll = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting user',
                errors: err
            });

            throw err;
        }

        if (!users) return res.status(404).json({
            success: false,
            message: 'There are no users available'
        });

        let bcAccounts = [];

        for (var i = 0; i < users.length; i++)
            bcAccounts.push({
                owner: users[i].firstName + ' ' + users[i].lastName,
                bcAccount: users[i].bcAccount.accountHash,
                createdAt: users[i].createdAt,
                updatedAt: users[i].updatedAt
            });

        return res.status(200).json({
            success: true,
            message: 'Users successfully readed',
            bcAccounts: bcAccounts
        });
    });

}

module.exports = getAll;
