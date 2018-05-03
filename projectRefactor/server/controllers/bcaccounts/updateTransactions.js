'use strict';

const User          = require('../../models/User');
const BCAccount     = require('../../models/BCAccount');

/*********************************************************************************
 * Update the transactions of the given user and the account
 */
function updateTransaction (transInfo, cb)  {

    BCAccount.findOne({ accountHash: transInfo.accountHash }, (err, accountData) => {
        if (err) {
            return {
                error: true,
                message: 'Error getting account',
                errors: err
            };

            throw err;
        }

        if (!accountData) return {
            success: false,
            message: 'Account does not exist'
        };
        else {

            accountData.transactionsReceived.push({
                from: transInfo.transaction.from,
                fromName: transInfo.transaction.fromName,
            });

            User.findOne({ 'bcAccount.accountHash': accountData.accountHash }, 
            (errS, userData) => {
                if (errS) {
                    return {
                        error: true,
                        message: 'Error getting user',
                        errors: errS
                    };
        
                    throw errS;
                }

                if (!userData) return {
                    success: false,
                    message: 'User does not exist'
                };
                else {

                    // Setting actual time
                    let date   = new Date();
                    let offset = date.getTimezoneOffset();
                    date.setMinutes(date.getMinutes() - offset);

                    accountData.updatedAt = date.toISOString();

                    BCAccount.findByIdAndUpdate(accountData._id, accountData, (errUC, accountUpdated) => {    
                        if (errUC) {
                            return {
                                error: true,
                                message: 'Error updating account',
                                errors: errUC
                            };
                
                            throw errUC;
                        }

                        userData.bcAccount = accountData;
                        userData.updatedAt = date.toISOString();

                        User.findByIdAndUpdate(userData._id, userData, (errUS, userUpdated) => {
                            if (errUS) {
                                return {
                                    error: true,
                                    message: 'Error updating user',
                                    errors: errUS
                                };
                    
                                throw errUS;
                            }

                            if (!userUpdated) return {
                                success: false,
                                message: 'User does not exist'
                            };

                            console.log({
                                success: true,
                                message: 'User successfully updated ' +
                                        'and account successfully updated',
                                //userUpdated: userData
                            });
        
                        });
                    });

                }
            });

        }
    });

};

module.exports = updateTransaction;
