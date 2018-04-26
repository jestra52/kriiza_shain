'use strict';

const User = require('../../models/User');

let getAll = (req, res) => {

    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting user',
                errors: err
            });

            throw err;
        }

        if (!users) return res.status(404).send({
            success: false,
            message: 'There are no users available'
        });

        let usersData = [];

        for (var i = 0; i < users.length; i++)
            usersData.push({
                email: users[i].email,
                firstName: users[i].firstName,
                lastName: users[i].lastName,
                createdAt: users[i].createdAt
            });

        return res.status(200).json({
            success: true,
            message: 'User successfully readed',
            users: usersData
        });
    });

}

module.exports = getAll;
