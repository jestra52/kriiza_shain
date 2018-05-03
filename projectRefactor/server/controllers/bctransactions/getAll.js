'use strict';

const BCTransaction = require('../../models/BCTransaction');

/*********************************************************************************
* Web service: Get all users with non-sensitive data
* URI: /api/bctransactions
* Method: GET
*/
let getAll = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    BCTransaction.find({}, (err, transactions) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Error getting transactions',
                errors: err
            });

            throw err;
        }

        console.log(transactions);
        

        if (transactions.length == 0) return res.status(404).json({
            success: false,
            message: 'There are no transactions available'
        });

        let transactionsData = [];

        for (var i = 0; i < transactions.length; i++) {
            let parentInfo = {};

            if (!transactions[i].parentTransactionHash || transactions[i].parentTransactionHash == "")
                parentInfo = { hasParent: false };
            else 
                parentInfo = { 
                    hasParent: true, 
                    parentTransactionHash: transactions[i].parentTransactionHash
                };

            transactionsData.push({
                transactionInfo: {
                    transactionOwner: transactions[i].transactionInfo.transactionOwner,
                    to: transactions[i].transactionInfo.to,
                    content: transactions[i].transactionInfo.content
                },
                transactionHash: transactions[i].transactionHash,
                parentInfo: parentInfo,
                createdAt: transactions[i].transactions,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Transactions successfully readed',
            transactions: transactionsData,
            totalTransactions: transactions.length
        });
    });

}

module.exports = getAll;