<template>
    <div id="transaction">
        <div id="topBar">
            <h3 id="titlePP">SHAIN</h3>
            <table id="options" align="right" name="options">
                <tr>
                    <th>
                        <router-link to="/transaction">
                            <a class="btn btn-light btnProfile">
                                <span class="btn btn-light">Transacciones</span>
                            </a>
                        </router-link>
                    </th>
                </tr>

            </table>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-push-2">
                    <h1 class="text-center">Shain</h1>
                    <br/>
                </div>
            </div>

            <div id="cafeVerdeRow" class="row" style="float:left; width:49%;">
                <div class="col-sm-6 col-sm-push-3 col-md-4 col-md-push-4" style="width:49%;">
                    <table cellspacing="90">
                        <tr style="width:500px;border:1px solid black">
                            <td style="width:50%; height:50%;">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">Cafe Verde</h3>
                                    </div>
                                    <div class="panel-body">
                                        <h4 style="margin-top:44px;">Cafe</h4>
                                        <strong>Cantidad</strong>:
                                        <span id="cafeVerde"></span> KG
                                        <br/>
                                        <br/>
                                        <h4>Enviar a</h4>
                                        <select class="form-control" id="destinoCafeVerde">
                                            <option value="0xf17f52151EbEF6C7334FAD080c5704D77216b732">FEDERACIÓN DE CAFE</option>
                                            <option value="0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef">INTERMEDIARIO 1</option>
                                            <option value="0x821aEa9a577a9b44299B9c15c88cf3087F3b5544">INTERMEDIARIO 2</option>
                                            <option value="0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2">INTERMEDIARIO 3</option>
                                        </select>
                                        <input type="text" class="form-control" id="cantidadCafeVerde" placeholder="Cantidad" style="margin-top:2%;" />
                                        <button class="btn btn-primary" id="transferirCafeVerde" type="button" style="margin-top:2%;">Transferir</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="cafeTostadoRow" class="row" style="float:left; width:49%;">
                <div class="col-sm-6 col-sm-push-3 col-md-4 col-md-push-4" style="width:49%;">
                    <table cellspacing="90">
                        <tr style="width:500px;border:1px solid black">
                            <td style="width:50%;">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">Cafe Tostado</h3>
                                    </div>
                                    <div class="panel-body">
                                        <select class="form-control" id="GranoMolido">
                                            <option value="GRANO">Grano</option>
                                            <option value="MOLIDO">Molido</option>
                                        </select>
                                        <h4>Cafe</h4>
                                        <strong>Cantidad</strong>:
                                        <span id="cafeTostado"></span> KG
                                        <br/>
                                        <br/>
                                        <h4>Enviar a:</h4>
                                        <select class="form-control" id="destinoCafeTostado">
                                            <option value="0xf17f52151EbEF6C7334FAD080c5704D77216b732">FEDERACIÓN DE CAFE</option>
                                            <option value="0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef">INTERMEDIARIO 1</option>
                                            <option value="0x821aEa9a577a9b44299B9c15c88cf3087F3b5544">INTERMEDIARIO 2</option>
                                            <option value="0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2">INTERMEDIARIO 3</option>
                                        </select>
                                        <input type="text" class="form-control" id="cantidadCafeTostado" placeholder="Cantidad" style="margin-top:2%;" />
                                        <button class="btn btn-primary" id="transferirCafeTostado" type="button" style="margin-top:2%;">Transferir</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

const Web3 = require('web3');
const web3 = new Web3();
const contract = require('../../build/contracts/CafeVerde.json');
web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:7545'));
var provider = new Web3.providers.HttpProvider("http://localhost:7545");
var truffleContract = require("truffle-contract");
var Mycontract = truffleContract(contract);
Mycontract.setProvider(provider);
function getBalancesVerde(){
    console.log('Getting balances...');
    
    var cafeVerdeInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      
      Mycontract.deployed().then(function (instance) {
        cafeVerdeInstance = instance;
        console.log(cafeVerdeInstance);
        return cafeVerdeInstance.balanceOf(account);
      }).then(function (result) {
        balance = result.c[0];
        console.log(balance);
        //$('#cafeVerde').text(balance);
      }).catch(function (err) {
        console.log(err.message);
      });
    });
}
getBalancesVerde();

</script>
