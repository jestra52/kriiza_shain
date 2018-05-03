<template>
    <div id="transaction">
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
                                        <span id="cafeVerde">{{ getBalanceVerdeValue() }}</span> KG
                                        <br/>
                                        <br/>
                                        <h4>Enviar a</h4>
                                        <select class="form-control" id="destinoCafeVerde" v-model="selectedVerde">
                                            <option v-for="bcAccount in getBcAccounts" :key="bcAccount.id" v-bind:value="bcAccount.bcAccount" >
                                                {{ bcAccount.owner }}
                                            </option>
                                        </select>
                                        <input type="text" class="form-control" id="cantidadCafeVerde" v-model="cantidadCafeVerde" placeholder="Cantidad" style="margin-top:2%;" />
                                        <button class="btn btn-primary" id="transferirCafeVerde" type="button" @click="submitVerde()" style="margin-top:2%;">Transferir</button>
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
                                        <span id="cafeTostado">{{ getBalanceTostadoValue() }}</span> KG
                                        <br/>
                                        <br/>
                                        <h4>Enviar a:</h4>
                                        <select class="form-control" id="destinoCafeTostado" v-model="selectedTostado">
                                            <option v-for="bcAccount in getBcAccounts" :key="bcAccount.id" v-bind:value="bcAccount.bcAccount">
                                                {{ bcAccount.owner }}
                                            </option>
                                        </select>
                                        <input type="text" class="form-control" id="cantidadCafeTostado" v-model="cantidadCafeTostado" placeholder="Cantidad" style="margin-top:2%;" />
                                        <button class="btn btn-primary" id="transferirCafeTostado" type="button" @click="submitTostado()" style="margin-top:2%;">Transferir</button>
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
const Web3 = require("web3");
const web3 = new Web3();
const contractVerde = require("../../build/contracts/CafeVerde.json");
const contractTostado = require("../../build/contracts/CafeTostado.json");
web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:7545"));
var provider = new Web3.providers.HttpProvider("http://localhost:7545");
var truffleContract = require("truffle-contract");
var MycontractVerde = truffleContract(contractVerde);
var MycontractTostado = truffleContract(contractTostado);
MycontractVerde.setProvider(provider);
MycontractTostado.setProvider(provider);

import { mapGetters, mapActions } from "vuex";
import { store } from "../store/store";

export default {
  data() {
    return {
      hash: "",
      balanceVerde: "",
      balanceTostado: "",
      cantidadCafeVerde: "",
      selectedVerde: "",
      cantidadCafeTostado: "",
      selectedTostado: ""
    };
  },

  store,

  computed: {
    ...mapGetters([
      "getUser",
      "getErrorMessage",
      "getBcAccounts",
      "getTransactionInfo"
    ])
  },

  methods: {
    begin: function() {
      this.$store.dispatch("getAllAccounts");
    },
    getBalanceVerdeValue() {
      this.getBalancesVerde();
      return this.balanceVerde;
    },
    getBalanceTostadoValue() {
      this.getBalancesTostado();
      return this.balanceTostado;
    },
    submitVerde() {
      var amount = this.$data.cantidadCafeVerde;
      var toAddress = this.$data.selectedVerde;

      console.log("Transfer " + amount + " TT to " + toAddress);

      var cafeVerdeInstance;
      var self = this;

      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }

        var account = self.$store.state.user.data.bcAccount.accountHash;
        MycontractVerde.deployed()
          .then(function(instance) {
            cafeVerdeInstance = instance;
            return cafeVerdeInstance.transfer(toAddress, amount, {
              from: account
            });
          })
          .then(function(result) {
            alert("Transfer Successful!");
            self.getBalancesVerde();
          })
          .catch(function(err) {
            console.log(err.message);
          });
      });
    },
    submitTostado() {
      var amount = this.$data.cantidadCafeTostado;
      var toAddress = this.$data.selectedTostado;

      console.log("Transfer " + amount + " TT to " + toAddress);

      var cafeTostadoInstance;
      var self = this;

      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }

        var account = self.$store.state.user.data.bcAccount.accountHash;
        MycontractTostado.deployed()
          .then(function(instance) {
            cafeTostadoInstance = instance;
            return cafeTostadoInstance.transfer(toAddress, amount, {
              from: account
            });
          })
          .then(function(result) {
            alert("Transfer Successful!");
            self.getBalancesTostado();
          })
          .catch(function(err) {
            console.log(err.message);
          });
      });
    },
    getBalancesVerde() {
      console.log("Getting balances...");
      console.log(this.$data.selectedVerde);
      var cafeVerdeInstance;
      var self = this;

      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
        var account = self.$store.state.user.data.bcAccount.accountHash;

        MycontractVerde.deployed()
          .then(function(instance) {
            cafeVerdeInstance = instance;
            //console.log(cafeVerdeInstance);
            return cafeVerdeInstance.balanceOf(account);
          })
          .then(function(result) {
            var balance = result.c[0];
            self.balanceVerde = balance;
            self.$store.dispatch("currentBalanceVerde", balance);
          })
          .catch(function(err) {
            console.log(err.message);
          });
      });
    },
    getBalancesTostado() {
      console.log("Getting balances...");

      var cafeTostadoInstance;
      var self = this;

      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }

        var account = self.$store.state.user.data.bcAccount.accountHash;
        MycontractTostado.deployed()
          .then(function(instance) {
            cafeTostadoInstance = instance;
            return cafeTostadoInstance.balanceOf(account);
          })
          .then(function(result) {
            var balance = result.c[0];
            console.log(balance);

            self.balanceTostado = balance;
            self.$store.dispatch("currentBalanceTostado", balance);
          })
          .catch(function(err) {
            console.log(err.message);
          });
      });
    },

    ...mapActions([
      "getUserInfo",
      "getAllAccounts",
      "logout",
      "currentBalanceTostado",
      "currentBalanceVerde"
    ])
  },
  beforeMount() {
    this.begin();
  }
};
</script>
