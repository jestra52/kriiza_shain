'use strict';

const User = require('../../models/User');

let getById = (req, res) => {

    User.findById(req.params.id, (err, userData) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting user',
                errors: err
            });

            throw err;
        }

        if (!userData) return res.status(404).send({
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

module.exports = getById;
