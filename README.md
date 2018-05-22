# Kriiza Shain
A Blockchain application made for products history.

# Requirements
- Solidity Compiler (^0.4.19): http://solidity.readthedocs.io/en/develop/installing-solidity.html
- Truffle.js (^4.1.5): https://github.com/trufflesuite/truffle
- Ganache Client (^6.1.0): https://github.com/trufflesuite/ganache-cli

# Installation (on Linux)
## Installing dependencies
```bash
$ sudo npm install -g truffle
$ sudo npm install -g ganache-cli
$ sudo npm install -g solc
```

## Installing and running server (RESTful API)
```bash
$ git clone https://github.com/jestra52/kriiza_shain.git
$ cd kriiza_shain/projectRefactor/server/
$ npm install
$ node app.js 
(If you have Gulp installed then: $ gulp)
```

## To run Ganache test network
```bash
$ cd ../client/shain_client_refactor/ (from server/ path)
$ npm install
$ ganache-cli -a 100 -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" --port 7545 (for test network)
$ cd contracts/
$ truffle migrate (running test network or ethereum network)
```

## Installing and running client
```bash
$ cd ../client/shain_client_refactor/ (from server/ path)
$ npm install
$ npm run dev (running server RESTful API)
```
