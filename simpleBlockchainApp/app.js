'use strict';

const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

web3.eth.defaultAccount = web3.eth.accounts[0];

var PersonContract = web3.eth.contract([
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_age",
                "type": "uint256"
            }
        ],
        "name": "setNameAndAge",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getNameAndAge",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]);

var Person = PersonContract.at('0x8cdaf0cd259887258bc13a92c0a6da92698644c0');

var i = web3.eth.blockNumber;

console.log(web3.eth.getBlock(web3.eth.blockNumber).number);

while (i >= 0) {
    console.log(web3.eth.getBlock(web3.eth.blockNumber - i).number);
    i--;
}
//Person.setNameAndAge('Juan C', 20);
//console.log(Person);