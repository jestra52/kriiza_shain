<template>
    <v-content>

        <v-jumbotron height="auto" dark>
            <v-container fill-height>
                <v-layout align-center>
                    <v-flex>
                        <h3 class="display-3">Realiza una transacción</h3>
                        <span class="subheading">
                            <p>Envía la cantidad de café que quieras a quien quieras</p>
                            <p>Puedes enviar café verde y café tostado</p>
                            <p>Aquí es donde ocurre la magia ;)</p>
                        </span>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-jumbotron>

        <v-container grid-list-lg>
            <v-layout row wrap v-if="getUser != null && getUser.isLoggedIn != false">
                <v-flex xs12 md6 lg6>
                    <v-card flat class="elevation-5">
                        <v-toolbar dark color="blue darken-4">
                            <v-toolbar-title>Café verde</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-title primary-title>
                            <v-layout row wrap>
                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Cantidad disponible</h3>
                                    <div>{{ getBalanceVerdeValue() }} KG</div>
                                </v-flex>

                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Enviar a</h3>
                                    <v-select
                                    :items="getBcAccounts"
                                    item-text="owner"
                                    v-model="selectedVerde"
                                    item-value="bcAccount"
                                    label="Destinatario"
                                    color="blue darken-2"
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Cantidad a enviar</h3>
                                    <v-text-field
                                    color="blue darken-2"
                                    name="cantidadCafeVerde"
                                    v-model="cantidadCafeVerde"
                                    label=""
                                    type="text">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-card-title>

                        <v-card-actions>
                            <v-btn flat color="green">Más detalles</v-btn>
                            <v-btn flat color="green" @click="submitVerde()">Enviar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>

                <v-flex xs12 md6 lg6>
                    <v-card flat class="elevation-5">
                        <v-toolbar dark color="blue darken-4">
                            <v-toolbar-title>Café tostado</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-title primary-title>
                            <v-layout row wrap>
                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Cantidad</h3>
                                    <div>{{ getBalanceTostadoValue()}} KG</div>
                                </v-flex>

                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Enviar a</h3>
                                    <v-select
                                      :items="getBcAccounts"
                                      item-text="owner"
                                      item-value="bcAccount"
                                      v-model="selectedTostado"
                                      label="Destinatario"
                                      color="blue darken-2"
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Cantidad a enviar</h3>
                                    <v-text-field
                                    color="blue darken-2"
                                    name="cantidadCafeVerde"
                                    v-model="cantidadCafeTostado"
                                    label=""
                                    type="text">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-card-title>

                        <v-card-actions>
                            <v-btn flat color="green">Más detalles</v-btn>
                            <v-btn flat color="green" @click="submitTostado()">Enviar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>

            <v-jumbotron dark v-else height="auto">
                <v-layout row wrap>
                    <v-flex xs12 lg12>
                        <h2 class="display-2">No has iniciado sesión :(</h2>
                    </v-flex>
                </v-layout>
            </v-jumbotron>
        </v-container>

    </v-content>
</template>

<script>

import config from '../config';

const apiURL = 'http://' + config.apiHost;
console.log('ETH NETWORK', config.ethNetwork);

const Web3 = require("web3");
const web3 = new Web3();

//import contractVerde from '../output/CafeVerde.json';
//import contractTostado from '../output/CafeTostado.json';

const contractVerde = require("../output/CafeVerde.json");
const contractTostado = require("../output/CafeTostado.json");
web3.setProvider(new web3.providers.HttpProvider(config.ethNetwork));
var provider = new Web3.providers.HttpProvider(config.ethNetwork);
var truffleContract = require("truffle-contract");
var MycontractVerde = truffleContract(contractVerde);
var MycontractTostado = truffleContract(contractTostado);
MycontractVerde.setProvider(provider);
MycontractTostado.setProvider(provider);

//console.log(contractVerde);

console.log('WEB3', web3.eth);

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      hash: "",
      balanceVerde: "",
      balanceTostado: "",
      cantidadCafeVerde: "",
      selectedVerde: null,
      cantidadCafeTostado: "",
      selectedTostado: "",
      radioGroup: 1,
      radioGroup2: 1,
      accounts: []
    };
  },

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
      self.$store.dispatch("getUserByAccount", toAddress);

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
            var blockHash = result.receipt.blockHash;
            var firstName = self.$store.getters.getUserDataByAccount.firstName;
            var lastName = self.$store.getters.getUserDataByAccount.lastName;
            console.log();
            let data = {
                to: toAddress,
                toName: firstName + " " + lastName,
                content: {
                  balance: amount
                },
                transactionHash: blockHash
            }
            self.$store.dispatch("createTransaction", data);
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
            self.$data.balanceVerde = balance;
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

            self.$data.balanceTostado = balance;
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
