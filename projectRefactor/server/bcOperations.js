'use strict';

// /* const ProviderEngine = require('web3-provider-engine')
// const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js')
// const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js')
// const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
// const VmSubprovider = require('web3-provider-engine/subproviders/vm.js')
// const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js')
// const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
// const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')
// const Web3 = require('web3')

// var engine = new ProviderEngine()
// var web3 = new Web3(engine)

// // static results
// engine.addProvider(new FixtureSubprovider({
//   web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
//   net_listening: true,
//   eth_hashrate: '0x00',
//   eth_mining: false,
//   eth_syncing: true,
// }))

// // cache layer
// engine.addProvider(new CacheSubprovider())

// // filters
// engine.addProvider(new FilterSubprovider())

// // pending nonce
// engine.addProvider(new NonceSubprovider())

// // vm
// engine.addProvider(new VmSubprovider())

// // id mgmt

// // data source
// engine.addProvider(new RpcSubprovider({
//   rpcUrl: 'http://127.0.0.1:7545',
// }))

// // log new blocks
// engine.on('block', function(block){
//   console.log('================================')
//   console.log('BLOCK CHANGED:', '#'+block.number.toString('hex'), '0x'+block.hash.toString('hex'))
//   console.log('================================')
// })

// console.log(engine);

// // network connectivity error
// engine.on('error', function(err){
//   // report connectivity errors
//   console.error(err.stack)
// })

// // start polling for blocks
// engine.start() */
const Web3 = require('web3');
const web3 = new Web3();
const BCAccount = require('./models/BCAccount');
const mongoose = require('mongoose');
const config = require('./config/config');
web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:7545'));
mongoose.connect(config.db, (err, res) => {
    if (err) {
        console.error('Error connecting to database');
        throw err;
    }

    var databaseResponse = {
        dbHost: res.host,
        dbPort: res.port,
        dbUserConnected: res.user,
    };
    
    console.log('Connected to database', config.db);
    console.log('Database response:', databaseResponse);
});

BCAccount.findOne().sort({ 'createdAt': -1 }).exec((err, bcAccounts) => {
    if (err) {
        throw err;
    }

    if (!bcAccounts){
        console.log("No hay");
    }
    console.log(bcAccounts);
});

console.log(web3.eth.accounts[0]);

// function pene(){
//     for(var i = 0;i<99;i++){
//         console.log(web3.eth.accounts[i]);
//     }
// }
// pene();


