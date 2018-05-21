<template>
    <v-content>

        <v-parallax src="/static/indexBackground.jpg">
            <v-layout column align-center justify-center class="white--text">
                <h1 class="white--text mb-2 display-1 text-xs-center">Bienvenido a SHAIN</h1>
                <div class="subheading mb-3 text-xs-center">El lugar donde puedes comprobar la legitimidad de tu producto</div>
            </v-layout>
        </v-parallax>

        <v-jumbotron :gradient="gradient" dark height="500px">

        </v-jumbotron>

        <v-parallax src="/static/indexBackground.jpg" height="380">
            <v-layout column align-center justify-center>
                <div class="headline white--text mb-3 text-xs-center">Web development has never been easier</div>
                <em>Kick-start your application today</em>
                <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
                    Get Started
                </v-btn>
            </v-layout>
        </v-parallax>

        <v-jumbotron :gradient="gradient" dark height="auto">
            <v-container fill-height>
                <v-layout align-center>
                    <v-flex>
                        <h3 class="display-3">Historial de transacciones</h3>
                        <span class="subheading">
                            <p>Transacciones totales</p>
                        </span>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12 lg6 v-for="(transaction, i) in getAllTransactions" :key="i" >
                        <v-card light>
                            <v-card-text>
                                <h1># {{ i }}</h1>
                                <div>Dueño: {{ transaction.transactionInfo.transactionOwnerName }}</div>
                                <div>Destinatario: {{ transaction.transactionInfo.toName }}</div>
                                <div>Contenido: {{ transaction.transactionInfo.content }}</div>
                                <div>Hash de la transaccion: {{ transaction.transactionHash }}</div>
                                <div>parentInfo: {{ transaction.parentInfo }}</div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

                <v-btn :loading="loading" :disabled="loading" color="success"
                @click="bringtransactions()"
                @click.native="loader = 'loading'"
                >
                    Actualizar
                </v-btn>
            </v-container>
        </v-jumbotron>

        <v-parallax src="/static/indexBackground.jpg" height="380">
            <v-layout column align-center justify-center>
                <div class="headline white--text mb-3 text-xs-center">Web development has never been easier</div>
                <em>Kick-start your application today</em>
                <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
                    Get Started
                </v-btn>
            </v-layout>
        </v-parallax>

    </v-content>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';

export default {
    data: () => ({
        gradient: 'to top, #0D47A1, #2196F3',
        hash: '',
        loader: null,
        loading: false
    }),

    computed: {
        ...mapGetters([
            'getUser',
            'getErrorMessage',
            'getAllTransactions',
            'getBcAccountData'
        ])
    },

    watch: {
        loader () {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 1000);

            this.loader = null;
        }
    },

    methods: {
        submit () {
            this.$store.dispatch('getUserInfo');
        },

        bringtransactions () {
            this.$store.dispatch('getTransactions');
            this.$data.transactions = this.$store.state.transactions;
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
