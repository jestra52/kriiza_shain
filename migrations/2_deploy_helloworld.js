var Helloworld = artifacts.require('Helloworld');

module.exports = (deployer) => {
    deployer.deploy(Helloworld);
};
