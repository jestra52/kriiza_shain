var CafeVerde = artifacts.require('CafeVerde');
var expect     = require('chai').expect;

contract('Testing the "CafeVerde" smart contract', (accounts) => {

    describe('Deploying the "CafeVerde" smart contract', () => {
        it('Catching an instance of the "CafeVerde" contract', () => {
            return CafeVerde.new().then((instance) => {
                CafeVerdeContract = instance;
            });
        });
    });

    describe('Checking the contract variables', () => {
        it('The initial supply is 12000', () => {
            return CafeVerdeContract.INITIAL_SUPPLY().then((res) => {
                expect(res.toString()).to.be.equal('12000');
            });
        });
    });

});