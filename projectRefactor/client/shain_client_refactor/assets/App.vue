<template>
    <v-app light class="blue darken-2">

        <v-toolbar fixed app :clipped-left="clipped">
            <v-btn icon active-class to="/"><img src="/static/shainicon.png"></v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items v-if="getUser.isLoggedIn == false">
                <v-btn flat active-class to="/login">Iniciar sesión</v-btn>
                <v-btn flat active-class to="/signup">Crear cuenta</v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-else>
                <v-btn flat active-class to="/transaction">Panel de transacción</v-btn>
                <v-btn flat active-class to="/userinfo">Información de usuario</v-btn>
                <v-btn flat active-class @click="closeSession()">Cerrar sesión</v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <v-slide-y-transition mode="out-in">
            <router-view></router-view>
        </v-slide-y-transition>

        <v-footer height="auto" class="blue darken-2 white--text text-xs-center">
            <v-container fluid>
                <v-layout align-center justify-center>
                    <v-flex xs12 lg8>
                        <v-card flat tile class="transparent white--text text-xs-center">
                            <v-card-text>
                                <h2 class="mb-2 text-xs-center">¡Encuentranos en las redes sociales!</h2>

                                <v-btn fab dark color="red darken-2">
                                    <v-icon dark>fa-google</v-icon>
                                </v-btn>

                                <v-btn fab dark color="blue darken-4">
                                    <v-icon dark>fa-facebook</v-icon>
                                </v-btn>

                                <v-btn fab dark color="blue">
                                    <v-icon dark>fa-twitter</v-icon>
                                </v-btn>

                                <v-btn fab dark color="pink darken-1">
                                    <v-icon dark>fa-instagram</v-icon>
                                </v-btn>
                            </v-card-text>

                            <v-layout row wrap>
                                <v-flex xs12 lg6>
                                    <v-card class="elevation-0 transparent white--text">
                                        <h2 class="mb-2 text-xs-center">CREADO POR KRIIZA</h2>
                                        <v-card-text>
                                        Grupo de estudiantes de ingeniería de sistemas de la Universidad EAFIT,
                                        responsable de idear e implementar el proyecto Shain, el cual consiste en darle
                                        un valor agregado a los productos del café y una seguridad al consumidor.
                                        </v-card-text>
                                    </v-card>
                                </v-flex>

                                <v-flex xs12 lg6>
                                    <v-card class="elevation-0 transparent white--text">
                                        <h2 class="mb-2 text-xs-center">AUTORES</h2>
                                        <div><a href="https://github.com/jestra52">Juan Carlos Estrada Alvarez</a></div>
                                        <div><a href="https://github.com/NoNameOriginal">Christian Londoño Cañas</a></div>
                                        <div><a href="https://github.com/jlondo96">Juan Pablo Londoño Botina</a></div>
                                        <div><a href="https://github.com/gfernan6">Geralin Fernandez Bedoya</a></div>
                                    </v-card>
                                </v-flex>
                            </v-layout>

                            <v-card-text class="white--text mt-3">
                                &copy;2018 — <strong>SHAIN</strong>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-footer>

    </v-app>
</template>

<style>

    a {
        color: white;
    }

</style>

<script>

import Meta from 'mixins/meta';
import { mapGetters, mapActions} from 'vuex';

export default {
    mixins: [Meta],

    data () {
        return {
            gradientTop: 'to top, #1A237E, #1976D2',
            clipped: false,
            drawer: true,
            fixed: false,
            items: [
                { title: 'Iniciar sesión', to: '/' },
                { title: 'Crear cuenta', to: '/inspire' }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'SHAIN'
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

    methods: {
        /*submit () {
            // Passing the email and password in an object as payload to the login action
            this.$store.dispatch('login', {
                email: this.$data.email,
                password: this.$data.password
            });
            // Passing the email and password in an object as payload to the login action
            this.$store.dispatch('login', {
                email: "fede@cafe.com",
                password: "1234"
            });
        },*/

        closeSession () {
            this.$store.dispatch('logout');
        },

        ...mapActions([
            'login',
            'logout'
        ])
    }
}

</script>
