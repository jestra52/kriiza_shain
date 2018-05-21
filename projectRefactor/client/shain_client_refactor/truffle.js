module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  contracts_build_directory: "../output",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    bcnet: {
      host: "pi2shain.dis.eafit.edu.co/bcnet",
      network_id: "*" // Match any network id
    }
  }
};

