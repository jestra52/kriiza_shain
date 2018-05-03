'use strict';

const User          = require('../../models/User');
const BCTransaction = require('../../models/BCTransaction');

/*********************************************************************************
 * Web service: Update the data of the given user and create a transaction
 * URI: /api/bctransactions/create/:id
 * Method: PUT
 */
let create = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    BCTransaction.findOne({
        transactionHash: req.body.transactionHash
    },
    (err, transactionInfo) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting transaction',
                errors: err
            });

            throw err;
        }

        if (transactionInfo) return res.status(409).json({
            success: false,
            message: `Transaction ${transactionInfo.transactionHash} is already registered`
        });
        else {

            // Setting actual time
            let date   = new Date();
            let offset = date.getTimezoneOffset();
            date.setMinutes(date.getMinutes() - offset);
            
            let transactionToCreate = new BCTransaction();

            transactionToCreate.transactionInfo.to      = req.body.transactionInfo.to;
            transactionToCreate.transactionInfo.content = req.body.transactionInfo.content;
            transactionToCreate.parentTransactionHash   = req.body.parentTransactionHash;

            transactionToCreate.transactionHash = req.body.transactionHash;
            transactionToCreate.createdAt       = date.toISOString();
            transactionToCreate.updatedAt       = date.toISOString();

            User.findById(req.params.id, (errU, userData) => {
                if (errU) {
                    return res.status(500).json({
                        error: true,
                        message: 'Error getting transaction',
                        errors: errU
                    });
        
                    throw errU;
                }

                if (!userData) return res.status(404).json({
                    success: false,
                    message: 'The user does not exist'
                });

                transactionToCreate.transactionInfo
                                   .transactionOwner = userData.firstName + ' ' 
                                                     + userData.lastName;

                transactionToCreate.save((errST, tsctnCreated) => {

                    userData.bcTransactions.push(tsctnCreated);
                    userData.updatedAt = date.toISOString();

                    User.findByIdAndUpdate(req.params.id, userData, (err, userUpdated) => {
                        if (err) {
                            return res.status(500).json({
                                error: true,
                                message: 'Error getting user',
                                errors: err
                            });
                
                            throw err;
                        }
                
                        if (!userUpdated) return res.status(404).send({
                            success: false,
                            message: 'The user does not exist'
                        });
    
                        return res.status(200).json({
                            success: true,
                            message: 'Users successfully update ' +
                                     'and transaction successfully created',
                            transactionCreated: tsctnCreated
                        });
                    });
                });             

            });

        }
    });

};

module.exports = create;