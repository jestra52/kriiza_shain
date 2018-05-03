'use strict';

const User = require('../../models/User');


/*********************************************************************************
 * Web service: Update the data of given user
 * URI: /api/user/update
 * Method: PUT
 */
/*let update = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    // Setting actual time
    var date   = new Date();
    var offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);

    // Data to update
    var dataToUpdate = req.body;

    if (dataToUpdate.wishList) {
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

module.exports = update;*/