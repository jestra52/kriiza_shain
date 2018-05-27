const Web3 = require("web3");
const web3 = new Web3();
const abiDecoder = require('abi-decoder');
const truffleContract = require("truffle-contract");
const contractCafe = require("./output/Cafe.json");

const gas = 3000000;

web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:7545"));

let provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
let MyContractCafe = truffleContract(contractCafe);

MyContractCafe.setProvider(provider);

createContractCafe("CafeHola", "Juanito salkjfda", "Iyo", "nel", 1600);
//console.log(getActualValues());
//getActualValues()

//getTransaction("0x84d9f5252c271deeaa1e70f3908329e894a76aca1eeafafd38fc151df142db74");

function createContractCafe (tipoCafe, factorNaturaleza, factorHumano, factorTradicion, cantidadCafe) {
    web3.eth.getAccounts((err, accounts) => {
        if (err) throw err;

        MyContractCafe.new(tipoCafe, factorNaturaleza, factorHumano, factorTradicion, cantidadCafe, {
            from: accounts[0], 
            gas: gas
        })
        .then(instance => {
            let data = {
                address: instance.address,
                transactionHash: instance.transactionHash
            };
            
            getTransaction(data.transactionHash);
        })
        .catch(err => {
            console.log(err);    
        });
    });
}

function getTransaction (transactionHash) {
    console.log("Getting transaction...");

    web3.eth.getTransaction(transactionHash, (err, result) => {
        if (err) throw err;

        abiDecoder.addABI(contractCafe.abi);

        web3.eth.getTransactionReceipt(transactionHash, function(e, receipt) {
            const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
            console.log(decodedLogs[0].events);
            
        });
    });
}
