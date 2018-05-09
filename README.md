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
$ cd ../client/shain_client/ (from server/ path)
$ npm install
$ truffle migrate (running test network or ethereum network)
$ npm run dev
```

## Installing and running client
```bash
$ cd ../client/shain_client/ (from server/ path)
$ npm install
$ truffle migrate (running test network or ethereum network)
$ npm run dev (running server RESTful API)
```
