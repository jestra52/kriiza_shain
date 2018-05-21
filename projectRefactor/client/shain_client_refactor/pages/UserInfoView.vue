<template>
    <v-content>

        <v-jumbotron height="auto" dark>
            <v-container fill-height v-if="getUser != null && getUser.isLoggedIn != false">
                <v-layout row wrap>
                    <v-flex xs12 lg12>
                        <h3 class="display-3">Tu información</h3>
                    </v-flex>

                    <v-flex xs12 lg12>

                        <v-jumbotron :gradient="gradient" dark height="auto" class="elevation-5">
                            <v-toolbar dark color="light-blue darken-4">
                                <v-toolbar-title>Información principal</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <span class="subheading">
                                <p>Nombre: {{ getUser.data.firstName }} {{ getUser.data.lastName }}</p>
                                <p>E-mail: {{ getUser.data.email }}</p>
                                <p>Cuenta de la red Blockchain: {{ getUser.data.bcAccount.accountHash }}</p>
                            </span>

                            <v-toolbar dark color="light-blue darken-4">
                                <v-toolbar-title>Transacciones recibidas</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <span class="subheading" v-if="getUser.data.bcAccount.transactionsReceived != undefined && !getUser.data.bcAccount.transactionsReceived.length <= 0">
                                <div v-for="accountTsctn in getUser.data.bcAccount.transactionsReceived" :key="accountTsctn.id">
                                    <p>{{ accountTsctn }}</p>
                                </div>
                            </span>

                            <span class="subheading" v-else>
                                <p>No hay historial de transacciones recibidas :(</p>
                            </span>

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
                        <h3 class="display-1">Parece ser que no estás registrado, pero siempre hay una primera vez ;)</h3>
                    </v-flex>

                    <v-flex xs12 lg12>
                        <v-btn color="success"
                        :loading="loading" :disabled="loading"
                        @click.native="loader = 'loading'"
                        to="/signup">Registrate</v-btn>
                    </v-flex>

                    <v-flex xs12 lg12>
                        <h3 class="display-1">... O tal vez no has iniciado sesión</h3>
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
            gradient: 'to top, #1A237E, #5C6BC0',
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
