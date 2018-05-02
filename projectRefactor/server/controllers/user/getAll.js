'use strict';

const User = require('../../models/User');

/*********************************************************************************
* Web service: Get all users with non-sensitive data
* URI: /api/user
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

        let usersData = [];

        for (var i = 0; i < users.length; i++)
            usersData.push({
                email: users[i].email,
                firstName: users[i].firstName,
                lastName: users[i].lastName,
                bcTransactions: users[i].bcTransactions,
                bcAccount: users[i].bcAccount,
                createdAt: users[i].createdAt,
                updatedAt: users[i].updatedAt
            });

        return res.status(200).json({
            success: true,
            message: 'Users successfully readed',
            users: usersData
        });
    });

}

module.exports = getAll;
