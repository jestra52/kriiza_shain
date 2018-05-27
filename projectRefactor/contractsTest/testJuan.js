const Web3 = require("web3");
const web3 = new Web3();

const contractVerde = require("../../build/contracts/CafeVerde.json");
const contractTostado = require("../../build/contracts/CafeTostado.json");
web3.setProvider(new web3.providers.HttpProvider(config.ethNetwork));
var provider = new Web3.providers.HttpProvider(config.ethNetwork);
var truffleContract = require("truffle-contract");
var MycontractVerde = truffleContract(contractVerde);
var MycontractTostado = truffleContract(contractTostado);
MycontractVerde.setProvider(provider);
MycontractTostado.setProvider(provider);
