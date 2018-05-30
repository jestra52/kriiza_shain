const config = require('../config/config');

const Web3 = require("web3");
const web3 = new Web3();
const abiDecoder = require('abi-decoder');
const truffleContract = require("truffle-contract");
const contractCafe = require("../output/Cafe.json");

const gas = 3000000;

web3.setProvider(new web3.providers.HttpProvider(config.ethNetwork));

let provider = new Web3.providers.HttpProvider(config.ethNetwork);
let MyContractCafe = truffleContract(contractCafe);

MyContractCafe.setProvider(provider);
//createContractCafe("CafeHola", "Juanito salkjfda", "Iyo", "nel", 1600);


//createContractCafe("CafeHola", "Juanito salkjfda", "Iyo", "nel", 1600);

module.exports = {

    createContractCafe: (req, res) => {
        web3.eth.getAccounts((err, accounts) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: 'Error creating contract',
                    errors: err
                });
    
                throw err;
            }

            if (!accounts) return res.status(409).json({
                success: false,
                message: 'No accounts available in the BC network'
            });
            else {

                MyContractCafe.new(
                    req.body.tipoCafe, 
                    req.body.factorNaturaleza, 
                    req.body.factorHumano, 
                    req.body.factorTradicion,
                    req.body.cantidadCafe, 
                {
                    from: accounts[0], 
                    gas: gas
                })
                .then(instance => {
                    return res.status(200).json({
                        success: true,
                        message: 'Contract successfully created',
                        address: instance.address,
                        transactionHash: instance.transactionHash
                    });
                })
                .catch(errC => {
                    return res.status(500).json({
                        error: true,
                        message: 'Error creating contract',
                        errors: errC
                    });  
                });

            }
        });
    },

    getTransaction: (req, res) => {
        console.log("Getting transaction...");
    
        web3.eth.getTransaction(req.params.txhash, (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: 'Error getting contract',
                    errors: err
                });
    
                throw err;
            }

            if (!result) return res.status(409).json({
                success: false,
                message: 'There are no transactions available'
            });
            else {

                abiDecoder.addABI(contractCafe.abi);
    
                web3.eth.getTransactionReceipt(req.params.txhash, function(e, receipt) {

                    const decodedLogs = abiDecoder.decodeLogs(receipt.logs);

                    return res.status(200).json({
                        success: true,
                        message: 'Contract successfully read',
                        data: decodedLogs[0].events
                    });
                });

            }
        });
    }    

};
