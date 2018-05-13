<template>
    <div id="main">
            <div>
                <input type="text" class="form-control" id="hash" v-model="hash" placeholder="Ingrese el hash del producto">
                <button class="btn btn-primary btn-form" id="start" @click="submit()">Buscar</button>
            </div>

            <!--<div v-if="getUser.isLoggedIn == true">
                <button class="btn btn-primary btn-form" id="start" @click="makeTransaction()">Hacer transaccion</button>
            </div>-->


            <div v-if="getUser.isLoggedIn == true">
                <div class="row">
                    <!-- Panel -->
                    <div class="col-sm-6">
                        <div class="card">
                            <h3 class="card-header light-blue white-text">Transacciones</h3>
                            <div class="card-body">
                                <h4 class="card-title">Panel de transacción</h4>
                                <p class="card-text">Realiza una transacción de café</p>

                                <router-link to="/transaction">
                                    <a class="btn btn-light-blue">Ir al panel de transacción</a>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <!-- /Panel -->

                    <!-- Panel -->
                    <div class="col-sm-6">
                        <div class="card">
                            <h3 class="card-header mdb-color white-text">Tus datos</h3>
                            <div class="card-body">
                                <h4 class="card-title">Información del usuario</h4>
                                <p class="card-text">Consulta tu información aquí, {{ getUser.data.firstName}} :D</p>

                                <router-link to="/userinfo">
                                    <a class="btn btn-mdb-color">Ir al panel de datos</a>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <!-- /Panel -->
                </div>

                <div class="card">
                    <h3 class="card-header deep-purple white-text">Historial de transacciones recibidas</h3>
                    <div class="card-body">
                        <h3 class="card-title">Transacciones recibidas</h3>
                        <div v-if="getBcAccountData.transactionsReceived != undefined && !getBcAccountData.transactionsReceived.length <= 0">
                            <div v-for="accountTsctn in getBcAccountData.transactionsReceived" :key="accountTsctn.id">
                                <p class="card-text">
                                    {{ accountTsctn }}
                                </p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="card-text">No te han enviado transacciones :(</p>
                        </div>

                        <button class="btn btn-deep-purple" id="start" @click="bringAccountRegister()">
                            <i class="fa fa-refresh"></i> Actualizar
                        </button>
                    </div>
                </div>
            </div>

            <div id="transactions">
                <div class="card">
                    <h3 class="card-header blue-grey white-text">Historial de transacciones</h3>

                    <div class="card-body">
                        <h3 class="card-title">Transacciones totales</h3>
                        <div class="row">
                            <div class="col-lg-4 col-md-6" v-for="transaction in getAllTransactions" :key="transaction.id" v-bind:value="transaction.transactions">
                                <!-- Card -->
                                <div class="card">
                                    <!-- Card content -->
                                    <div class="card-body blue-grey">
                                        <!-- Title -->
                                        <h4 class="card-title"><a></a></h4>
                                        <p class="card-text white-text">Dueño: {{ transaction.transactionInfo.transactionOwnerName }}</p>
                                        <p class="card-text white-text">Destinatario: {{ transaction.transactionInfo.toName }}</p>
                                        <p class="card-text white-text">Contenido: {{ transaction.transactionInfo.content }}</p>
                                        <p class="card-text white-text">Hash de la transaccion: {{ transaction.transactionHash }}</p>
                                        <p class="card-text white-text">parentInfo: {{ transaction.parentInfo }}</p>
                                    </div>
                                </div>
                                <!-- Card -->
                            </div>
                        </div>

                        <button class="btn btn-blue-grey" id="start" @click="bringtransactions()">
                            <i class="fa fa-refresh"></i> Actualizar
                        </button>
                    </div>

                </div>
            </div>

    </div>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';
import { store } from '../store/store';

export default {
    data () {
        return {
            hash: '',
            transactions: {}
        }
    },

    computed: {
        ...mapGetters([
            'getUser',
            'getErrorMessage',
            'getAllTransactions',
            'getBcAccountData'
        ])
    },

    store,

    methods: {
        submit () {
            this.$store.dispatch('getUserInfo');
        },

        bringtransactions () {
            this.$store.dispatch('getTransactions');
        },

        makeTransaction () {
            let transactionInfo = {
                to: "0x56756idugfidfugkxFFFsfsfS",
                toName: "Juan C Estrada A",
                content: {
                    pene: 2374,
                    popo: 45666,
                    masPene: 56777,
                },
                transactionHash: "0xkjhgfs9SFFsDFFFfgaDEGg"
            };

            this.$store.dispatch('createTransaction', transactionInfo);
        },

        bringAccountRegister () {
            this.$store.dispatch('getAccountByUserId');
        },

        ...mapActions([
            'getUserInfo',
            'getTransactions',
            'createTransaction',
            'getAccountByUserId'
        ])
    }
}
</script>
