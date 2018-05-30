'use strict';

const Hash = require('../../models/Hash');

let getAll = (req, res) => {

    Hash.find({}, (err, hashes) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting hash',
                errors: err
            });

            throw err;
        }

        if (!hashes) return res.status(404).json({
            success: false,
            message: 'There are no hashes available'
        });
        else return res.status(200).json({
            success: true,
            message: 'Hashes successfully readed',
            hashes: hashes
        });
    });

};

module.exports = getAll;
