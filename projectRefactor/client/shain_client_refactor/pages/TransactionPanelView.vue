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
                            <v-toolbar-title>Realizar transferencia</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-title primary-title>
                            <v-layout row wrap>
                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Productos disponibles</h3>
                                    <v-select
                                    :items="GET_TX_HASHES_BY_ID"
                                    item-text="txValue"
                                    v-model="selectedCafe"
                                    item-value="_id"
                                    label="Seleccione uno de sus productos"
                                    color="blue darken-2"
                                    ></v-select>
                                    <!--<div>{{ getBalanceVerdeValue() }} KG</div>-->
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

                            </v-layout>
                        </v-card-title>

                        <v-card-actions>
                            <v-btn flat color="green">Más detalles</v-btn>
                            <v-btn flat color="green" @click="transferBlock()">Enviar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>

                <v-flex xs12 md6 lg6>
                    <v-card flat class="elevation-5">
                        <v-toolbar dark color="blue darken-4">
                            <v-toolbar-title>Agregar café</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-title primary-title>
                            <v-layout row wrap>
                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Tipo de café</h3>

                                    <v-radio-group v-model="tipoCafe">
                                        <v-radio label="Café tostado" value="CafeTostado"></v-radio>
                                        <v-radio label="Café verde" value="CafeVerde"></v-radio>
                                    </v-radio-group>

                                    <!--<v-text-field
                                    color="blue darken-2"
                                    name="cantidadCafeVerde"
                                    v-model="tipoCafe"
                                    label=""
                                    type="text">
                                    </v-text-field>-->
                                </v-flex>

                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">¿Donde lo hizo?</h3>
                                    <v-text-field
                                    color="blue darken-2"
                                    name="factorNaturaleza"
                                    v-model="factorNaturaleza"
                                    label="Lugar"
                                    type="text">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Técnicas aplicadas</h3>
                                    <v-text-field
                                    color="blue darken-2"
                                    name="factorTradicion"
                                    v-model="factorTradicion"
                                    label="Técnicas"
                                    type="text">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">¿Quienes trabajaron haciendo el café?</h3>
                                    <v-text-field
                                    color="blue darken-2"
                                    name="factorHumano"
                                    v-model="factorHumano"
                                    label="Nombres"
                                    type="text">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 lg12>
                                    <h3 class="headline mb-0">Cantidad hecha</h3>
                                    <v-text-field
                                    color="blue darken-2"
                                    name="cantidadCafe"
                                    v-model="cantidadCafe"
                                    label="Cantidad"
                                    type="text">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-card-title>

                        <v-card-actions>
                            <v-btn flat color="green">Más detalles</v-btn>
                            <v-btn to="/transaction" flat color="green" @click="createC()">Enviar</v-btn>
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

/*const Web3 = require("web3");
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

console.log('WEB3', web3.eth);*/

import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            hash: "",
            balanceVerde: "",
            balanceTostado: "",
            cantidadCafeVerde: "",
            selectedVerde: "",
            cantidadCafeTostado: "",
            selectedTostado: "",
            radioGroup: 1,
            radioGroup2: 1,
            selectedCafe: "",
            tipoCafe: "",
            factorNaturaleza: "",
            factorHumano: "",
            factorTradicion: "",
            cantidadCafe: 0,
            accounts: []
        };
    },

    computed: {
        ...mapGetters([
            "getUser",
            "getErrorMessage",
            "getBcAccounts",
            "getTransactionInfo",
            "GET_TX_HASHES_BY_ID"
        ])
    },

    methods: {
        begin: function() {
            this.$store.dispatch("getAllAccounts");
            this.$store.dispatch('getHashesByUserId');
            
        },

        getHashes: function () {
            this.$store.dispatch('getHashesByUserId');
        },
        createC() { 
            this.$store.dispatch('createContract',{
                tipoCafe: this.$data.factorNaturaleza,
                factorNaturaleza: this.$data.factorNaturaleza,
                factorHumano: this.$data.factorHumano,
                factorTradicion: this.$data.factorTradicion,
                cantidadCafe: this.$data.cantidadCafe
            });

            alert('REGISTRO GUARDADO. POR FAVOR RECARGUE LA PAGINA');
        },
        transferBlock() {
            this.$store.dispatch('transactionHash',{
                idToTransfer: this.$data.selectedVerde,
                hashId: this.$data.selectedCafe
            });

            alert('TRANSACCIÓN REALIZADA. POR FAVOR RECARGUE LA PAGINA');
        },

        /*getBalanceVerdeValue() {
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
                    var transactionHash = result.receipt.transactionHash;
                    var parentTransaction = web3.eth.getTransaction(transactionHash);
                    console.log("Transfer: ", amount, " TT, from:", parentTransaction.from, ", to: ", toAddress);
                    self.$store.dispatch("getParentByAccount", parentTransaction.from);

                    //console.log(result.receipt);

                    let data = self.submitVerdeHandler(self, amount, toAddress, parentTransaction, transactionHash);

                    self.$store.dispatch("createTransaction", data);
                    //self.$store.dispatch("removeParentDataByAccount");
                    self.getBalancesVerde();
                })
                .catch(function(err) {
                    console.log(err.message);
                });
            });
        },

        submitVerdeHandler (self, amount, toAddress, parentTransaction, transactionHash) {
            var firstName = self.$store.getters.getUserDataByAccount.firstName;
            var lastName = self.$store.getters.getUserDataByAccount.lastName;

            let data = {
                to: toAddress,
                toName: firstName + " " + lastName,
                content: {
                    type: 'CafeVerde',
                    balance: amount
                },
                transactionHash: transactionHash,
                parentTransactionHash: {
                    accountHash: parentTransaction.from
                }
            };

            return data;
        },

        submitTostado () {
            var amount = this.$data.cantidadCafeTostado;
            var toAddress = this.$data.selectedTostado;

            var cafeTostadoInstance = null;
            var self = this;

            self.$store.dispatch("getUserByAccount", toAddress);

            web3.eth.getAccounts(function(error, accounts) {
                if (error) {
                    console.log(error);
                }

                var account = self.$store.state.user.data.bcAccount.accountHash;

                MycontractTostado.deployed().then(function (instance) {
                    cafeTostadoInstance = instance;
                    return cafeTostadoInstance.transfer(toAddress, amount, {
                        from: account
                    });
                })
                .then(function (result) {
                    alert("Transfer Successful!");

                    var transactionHash = result.receipt.transactionHash;
                    var parentTransaction = web3.eth.getTransaction(transactionHash);
                    console.log("Transfer: ", amount, " TT, from:", parentTransaction.from, ", to: ", toAddress);
                    self.$store.dispatch("getParentByAccount", parentTransaction.from);

                    //console.log(result.receipt);

                    let data = self.submitTostadoHandler(self, amount, toAddress, parentTransaction, transactionHash);

                    self.$store.dispatch("createTransaction", data);
                    //self.$store.dispatch("removeParentDataByAccount");
                    self.getBalancesTostado();
                })
                .catch(function(err) {
                    console.log(err.message);
                });
            });
        },

        submitTostadoHandler (self, amount, toAddress, parentTransaction, transactionHash) {
            var firstName = self.$store.getters.getUserDataByAccount.firstName;
            var lastName = self.$store.getters.getUserDataByAccount.lastName;

            let data = {
                to: toAddress,
                toName: firstName + " " + lastName,
                content: {
                    type: 'CafeTostado',
                    balance: amount
                },
                transactionHash: transactionHash,
                parentTransactionHash: {
                    accountHash: parentTransaction.from
                }
            };

            return data;
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
        },*/

        ...mapActions([
            "getUserInfo",
            "getAllAccounts",
            "logout",
            "currentBalanceTostado",
            "currentBalanceVerde",
            "getParentByAccount",
            "getUserByAccount",
            "removeParentDataByAccount",
            "getHashesByUserId",
            "createContract",
            "transactionHash"
        ])
    },

    beforeMount() {
        this.begin();
    }
};

</script>
