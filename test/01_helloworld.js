var Helloworld = artifacts.require('Helloworld');
var expect     = require('chai').expect;

contract('Testing the "Helloworld" smart contract', (accounts) => {

    describe('Deploying the "Helloworld" smart contract', () => {
        it('Catching an instance of the "Helloworld" contract', () => {
            return Helloworld.new().then((instance) => {
                helloworldContract = instance;
            });
        });
    });

    describe('Checking the contract variables', () => {
        it('The "message" variable is "Hello world!"', () => {
            return helloworldContract.message().then((res) => {
                expect(res.toString()).to.be.equal('Hello world!');
            });
        });
    });

});
