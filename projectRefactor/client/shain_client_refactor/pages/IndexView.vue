<template>
    <v-content>

        <v-parallax src="/static/indexBackground.jpg">
            <v-layout column align-center justify-center class="white--text">
                <h1 class="white--text mb-2 display-1 text-xs-center">Bienvenido a SHAIN</h1>
                <div class="subheading mb-3 text-xs-center">El lugar donde puedes comprobar la legitimidad de tu producto</div>
            </v-layout>
        </v-parallax>

        <v-jumbotron :gradient="gradient" dark height="auto">
            <v-container fill-height>
                <v-layout align-center>
                    <v-flex>
                        <h3 class="display-3">Menu principal</h3>
                        <span class="subheading">
                            <p>Bienvenido</p>
                        </span>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container grid-list-lg>
                <v-jumbotron dark v-if="getUser != null && getUser.isLoggedIn != false" height="auto">
                    <v-layout row wrap>
                        <v-flex xs12 lg6>
                            <v-card flat class="elevation-5" color="light-blue darken-1">
                                <v-card-media src="/static/logged1.jpg" height="200px">
                                    <v-container fill-height fluid>
                                        <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline">Transacciones</span>
                                        </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-media>

                                <v-card-actions>
                                    <v-btn flat to="/transaction">Ir al panel de transacciones</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>

                        <v-flex xs12 lg6>
                            <v-card flat class="elevation-5" color="light-blue darken-1">
                                <v-card-media src="/static/sesion2.jpg" height="200px">
                                    <v-container fill-height fluid>
                                        <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline">Tus datos</span>
                                        </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-media>

                                <v-card-actions>
                                    <v-btn flat to="/userinfo">Ir al panel de datos</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>

                        <v-flex xs12 lg12>
                            <v-card flat class="elevation-5" color="light-blue darken-1">
                                <v-card-media src="/static/sesion2.jpg" height="200px">
                                    <v-container fill-height fluid>
                                        <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline">Historial de transacciones recibidas</span>
                                        </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-media>

                                <v-layout row wrap justify-space-between v-if="getBcAccountData.transactionsReceived != undefined && !getBcAccountData.transactionsReceived.length <= 0">
                                    <v-flex xs12 lg6 v-for="(accountTsctn, i) in getBcAccountData.transactionsReceived" :key="i" >
                                        <v-card light>
                                            <v-card-text >
                                                <p class="card-text">
                                                    {{ accountTsctn }}
                                                </p>
                                            </v-card-text>
                                        </v-card>
                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap v-else>
                                    <v-flex xs12 lg6>
                                        <span class="subheading">
                                            <p>No te han enviado transacciones :(</p>
                                        </span>
                                    </v-flex>
                                </v-layout>

                                <v-card-actions>
                                    <v-btn flat
                                    :loading="loading" :disabled="loading"
                                    @click.native="loader = 'loading'"
                                    @click="bringAccountRegister()">Actualizar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>

                        <v-flex xs12 lg12></v-flex>
                    </v-layout>
                </v-jumbotron>

                <v-jumbotron dark v-else height="auto">
                    <v-layout row wrap>
                        <v-flex xs12 lg6>
                            <v-card flat class="elevation-5" color="light-blue darken-1">
                                <v-card-media src="/static/sesion1.jpg" height="200px">
                                    <v-container fill-height fluid>
                                        <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline">Inicia sesión</span>
                                        </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-media>

                                <v-card-actions>
                                    <v-btn flat to="/login">Ver más</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>

                        <v-flex xs12 lg6>
                            <v-card flat class="elevation-5" color="light-blue darken-1">
                                <v-card-media src="/static/sesion2.jpg" height="200px">
                                    <v-container fill-height fluid>
                                        <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline">Crea una cuenta</span>
                                        </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-media>

                                <v-card-actions>
                                    <v-btn flat to="/signup">Ver más</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>

                        <v-flex xs12 lg12>

                        </v-flex>
                    </v-layout>
                </v-jumbotron>
            </v-container>

        </v-jumbotron>

        <v-parallax src="/static/indexBackground.jpg" height="380">
            <v-layout column align-center justify-center>
                <div class="headline white--text mb-3 text-xs-center">Transacciones de café</div>
                <em>Realiza transacciones de café donde quieras</em>
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
                <div class="headline white--text mb-3 text-xs-center">Consulta la historia de tu producto</div>
                <em>Ingresa el código de tu producto y mira todas las transacciones relacionadas con este</em>
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
