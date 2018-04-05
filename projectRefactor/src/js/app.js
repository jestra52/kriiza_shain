App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('CafeVerde.json', function (data) {
      var CafeVerdeArtifact = data;
      App.contracts.CafeVerde = TruffleContract(CafeVerdeArtifact);
      App.contracts.CafeVerde.setProvider(App.web3Provider);
      return App.getBalancesVerde();
    });
    $.getJSON('CafeTostado.json', function (data) {
      var CafeTostadoArtifact = data;
      App.contracts.CafeTostado = TruffleContract(CafeTostadoArtifact);
      App.contracts.CafeTostado.setProvider(App.web3Provider);
      return App.getBalancesTostado();
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '#transferirCafeVerde', App.handleTransferVerde);
    $(document).on('click', '#transferirCafeTostado', App.handleTransferTostado);
  },

  handleTransferVerde: function (event) {
    event.preventDefault();

    var amount = parseInt($('#cantidadCafeVerde').val());
    var toAddress = $('#destinoCafeVerde').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var cafeVerdeInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.CafeVerde.deployed().then(function (instance) {
        cafeVerdeInstance = instance;
        return cafeVerdeInstance.transfer(toAddress, amount, { from: account });
      }).then(function (result) {
        alert('Transfer Successful!');
        return App.getBalancesVerde();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },
  handleTransferTostado: function (event) {
    event.preventDefault();

    var amount = parseInt($('#cantidadCafeTostado').val());
    var toAddress = $('#destinoCafeTostado').val();
    //var state = $('#GranoMolido').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var cafeTostadoInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.CafeTostado.deployed().then(function (instance) {
        cafeTostadoInstance = instance;
        return cafeTostadoInstance.transfer(toAddress, amount, { from: account });
      }).then(function (result) {
        alert('Transfer Successful!');
        return App.getBalancesTostado();
      }).catch(function (err) {
        console.log(err.message);
      });

    });
  },

  getBalancesVerde: function () {
    console.log('Getting balances...');

    var cafeVerdeInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.CafeVerde.deployed().then(function (instance) {
        cafeVerdeInstance = instance;

        return cafeVerdeInstance.balanceOf(account);
      }).then(function (result) {
        balance = result.c[0];

        $('#cafeVerde').text(balance);
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },
  getBalancesTostado: function () {
    console.log('Getting balances...');

    var cafeTostadoInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.CafeTostado.deployed().then(function (instance) {
        cafeTostadoInstance = instance;
        return cafeTostadoInstance.balanceOf(account);
      }).then(function (result) {
        balance = result.c[0];
        $('#cafeTostado').text(balance);
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
