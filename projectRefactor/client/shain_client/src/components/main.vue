<template>
    <div id="main">
        <div class="container">
            <div>
                <input type="text" class="form-control" id="hash" v-model="hash" placeholder="Ingrese el hash del producto">
                <button class="btn btn-primary btn-form" id="start" @click="submit()">Comenzar</button>
            </div>

            <div v-if="getUser.isLoggedIn == true">
                <button class="btn btn-primary btn-form" id="start" @click="makeTransaction()">Hacer transaccion</button>
            </div>

            <div v-if="getUser.isLoggedIn == true">
                <h2>Historial de transacciones recibidas</h2>
                <div v-if="getBcAccountData.transactionsReceived != undefined && !getBcAccountData.transactionsReceived.length <= 0">
                    <div v-for="accountTsctn in getBcAccountData.transactionsReceived" :key="accountTsctn.id">
                        {{ accountTsctn }}
                    </div>
                </div>
                <div v-else>
                    No hay historial de transacciones recibidas :(
                </div>

                <button class="btn btn-primary btn-form" id="start" @click="bringAccountRegister()">Ver historial de transacciones recibidas</button>
            </div>

            <div id="transactions">
                <h2>Transacciones</h2>
                <div v-for="transaction in getAllTransactions" :key="transaction.id" v-bind:value="transaction.transactions">
                    <div class="jumbotron">
                        <p>Dueño: {{ transaction.transactionInfo.transactionOwnerName }}</p>
                        <p>Destinatario: {{ transaction.transactionInfo.toName }}</p>
                        <p>Contenido: {{ transaction.transactionInfo.content }}</p>
                        <p>Hash de la transaccion: {{ transaction.transactionHash }}</p>
                        <p>parentInfo: {{ transaction.parentInfo }}</p>
                    </div>
                </div>
            </div>

            <div>
                <button class="btn btn-primary btn-form" id="start" @click="bringtransactions()">Ver transacciones</button>
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
