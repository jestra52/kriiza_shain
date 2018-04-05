var CafeTostado = artifacts.require('CafeTostado');
var expect     = require('chai').expect;

contract('Testing the "CafeTostado" smart contract', (accounts) => {

    describe('Deploying the "CafeTostado" smart contract', () => {
        it('Catching an instance of the "CafeTostado" contract', () => {
            return CafeTostado.new().then((instance) => {
                CafeTostadoContract = instance;
            });
        });
    });

    describe('Checking the contract variables', () => {
        it('The initial supply is 12000', () => {
            return CafeTostadoContract.INITIAL_SUPPLY().then((res) => {
                expect(res.toString()).to.be.equal('12000');
            });
        });
    });

});