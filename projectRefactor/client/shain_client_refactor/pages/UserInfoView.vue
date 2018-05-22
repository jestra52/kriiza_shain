<template>
    <v-content>

        <v-jumbotron height="auto" dark>
            <v-container fill-height v-if="getUser != null && getUser.isLoggedIn != false">
                <v-layout row wrap>
                    <v-flex xs12 lg12>
                        <h3 class="display-3">Tu información</h3>
                    </v-flex>

                    <v-flex xs12 lg12>

                        <v-jumbotron :gradient="gradientTop" dark height="auto" class="elevation-5">
                            <v-toolbar dark color="light-blue darken-4">
                                <v-toolbar-title>Información principal</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-container grid-list-lg>
                                <v-layout row wrap>
                                    <v-flex lg12>
                                        <v-jumbotron height="auto">
                                            <div>Nombre: {{ getUser.data.firstName }} {{ getUser.data.lastName }}</div>
                                            <div>E-mail: {{ getUser.data.email }}</div>
                                            <div>Cuenta de la red Blockchain: {{ getUser.data.bcAccount.accountHash }}</div>
                                        </v-jumbotron>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>

                        <v-jumbotron :gradient="gradientTop" dark height="auto" class="elevation-5">
                            <v-toolbar dark color="light-blue darken-4">
                                <v-toolbar-title>Transacciones recibidas</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-container grid-list-lg v-if="getUser.data.bcAccount.transactionsReceived != undefined && !getUser.data.bcAccount.transactionsReceived.length <= 0">
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 md4 lg3 v-for="(accountTsctn, i) in getUser.data.bcAccount.transactionsReceived" :key="i" >
                                        <v-jumbotron height="auto">
                                            <h1># {{ i }}</h1>
                                            <div>De: {{ accountTsctn.fromName }}</div>
                                            <div>
                                                <h2>Contenido</h2>
                                                <div>
                                                    <div>Tipo de café: {{ accountTsctn.content.type }}</div>
                                                    <div>Cantidad: {{ accountTsctn.content.balance }} KG</div>
                                                </div>
                                            </div>
                                            <v-divider></v-divider>
                                        </v-jumbotron>
                                    </v-flex>
                                </v-layout>
                            </v-container>

                            <v-container grid-list-lg v-else>
                                <v-layout row wrap>
                                    <v-flex lg12>
                                        <v-jumbotron height="auto">
                                            <h2>No hay historial de transacciones recibidas :(</h2>
                                        </v-jumbotron>
                                    </v-flex>
                                </v-layout>
                            </v-container>

                            <v-btn flat
                            :loading="loading" :disabled="loading"
                            @click.native="loader = 'loading'"
                            @click="bringAccountRegister()">Actualizar</v-btn>
                        </v-jumbotron>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container v-else fill-height>
                <v-layout row wrap>
                    <v-flex xs12 lg12>
                        <h3 class="display-3">Tu información</h3>
                    </v-flex>

                    <v-flex xs12 lg12>
                        <h3 class="display-1">En este momento no tenemos información tuya :(</h3>
                    </v-flex>

                    <v-flex xs12 lg12>
                        <span class="subheading">
                            <p>Parece ser que no estás registrado, pero siempre hay una primera vez ;)</p>
                        </span>
                    </v-flex>

                    <v-flex xs12 lg12>
                        <v-btn color="success"
                        :loading="loading" :disabled="loading"
                        @click.native="loader = 'loading'"
                        to="/signup">Registrate</v-btn>
                    </v-flex>

                    <v-flex xs12 lg12>
                        <span class="subheading">
                            <p>... O tal vez no has iniciado sesión</p>
                        </span>
                    </v-flex>

                    <v-flex xs12 lg12>
                        <img src="/static/hmm.png" height="200px">

                    </v-flex>

                    <v-flex xs12 lg12>
                        <v-btn color="success"
                        :loading="loading" :disabled="loading"
                        @click.native="loader = 'loading'"
                        to="/login">Iniciar sesión</v-btn>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-jumbotron>

    </v-content>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';

export default {

    data () {
        return {
            gradientTop: 'to top, #1A237E, #1976D2',
            gradientBottom: 'to top, #1976D2, #1A237E',
            email: '',
            password: '',
            loader: null,
            loading: false,
            error: ''
        }
    },

    computed: {
        ...mapGetters([
            'getUser',
            'getErrorMessage'
        ])
    },

    watch: {
        loader () {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 2000);

            this.loader = null;
        }
    },

    methods: {
        logout () {
            this.$store.dispatch('logout');
        },

        bringAccountRegister () {
            this.$store.dispatch('getAccountByUserId');
        },

        ...mapActions([
            'login',
            'logout'
        ])
    }

}

</script>
