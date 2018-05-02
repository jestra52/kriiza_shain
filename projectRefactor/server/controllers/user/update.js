'use strict';

const User = require('../../models/User');


/*********************************************************************************
 * Web service: Update the data of the current user (actual session)
 * URI: /api/user/update
 * Method: PUT
 */
let update = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    // User from passport session
    var userID = req.user._id; 

    // Setting actual time
    var date   = new Date();
    var offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);

    // Data to update
    var dataToUpdate = req.body;
    var steamID      = "";

    if (dataToUpdate.birth) {
        dataToUpdate.birth = new Date(req.body.birth).toISOString();
    }

    if (dataToUpdate.steamProfile) {
        var protomatch   = /^(https?|ftp):\/\//; 
        var steamProfile = req.body.steamProfile;
        var cleanUrl     = steamProfile.replace(protomatch, '');
        steamID          = cleanUrl.split('/')[2];
    }

    if (dataToUpdate.wishList) {
        User.findById(userID, (err, userData) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Error updating user: ' + err
                });
            }

            if (!userData) {
                return res.status(400).send({
                    success: false,
                    message: 'The user does not exist'
                });
            }

            for (var i = 0; i < dataToUpdate.wishList.length; i++) {
                userData.wishList.push(dataToUpdate.wishList[i]);
            }

            dataToUpdate.wishList = userData.wishList;
        });
    }

    services.steamProfile(steamKey, steamID, (steamProfileData) => {
        dataToUpdate.steamProfile = steamProfileData;
        dataToUpdate.updatedAt    = date.toISOString();
                 
        User.findByIdAndUpdate(userID, dataToUpdate, (err, userUpdated) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Error updating user: ' + err
                });
            }

            if (!userUpdated) {
                return res.status(400).send({
                    success: false,
                    message: 'The user does not exist'
                });
            }

            
            return res.status(200).redirect('/api/user/read');
        });
    });
};

module.exports = update;