'use strict';

const Hash = require('../../models/Hash');

let get = (req, res) => {

    Hash.findById(req.params.id, (err, hashData) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting hash',
                errors: err
            });

            throw err;
        }

        if (!hashData) return res.status(404).json({
            success: false,
            message: 'There are no hashes available'
        });
        else return res.status(200).json({
            success: true,
            message: 'Hash successfully readed',
            hashData: hashData
        });
    });

};

module.exports = get;
