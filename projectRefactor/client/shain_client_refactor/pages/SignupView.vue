<template>
<v-content>

    <v-jumbotron height="auto" dark>
        <v-container fill-height>
            <v-layout align-center>
                <div v-if="getUser != null && getUser.isLoggedIn != false">
                    <v-flex xs12>
                        <h3 class="display-3">¡Bienvenido {{ getUser.data.firstName }}!</h3>
                        <span class="subheading">
                            <p>Te has registrado exitosamente, nos alegra tenerte aquí</p>
                            <p>También te hemos asociado tu cuenta a la red Blockchain yay</p>
                        </span>
                        <v-snackbar top vertical :timeout=timeout v-model="snackbarlogin" auto-height>
                            <p>¡Bienvenido {{ getUser.data.firstName }}!</p>
                            <v-btn flat color="blue" @click.native="snackbarlogin = false">Cerrar</v-btn>
                        </v-snackbar>
                    </v-flex>

                    <v-flex xs12>
                        <img height="200px" src="/static/yayface.jpg">
                    </v-flex>

                    <v-flex xs12>
                        <v-btn color="success" to="/">
                            Ir a la página principal
                        </v-btn>
                    </v-flex>
                </div>
            </v-layout>
        </v-container>
    </v-jumbotron>

    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 lg6>
                <v-card v-if="getUser.isLoggedIn == false" class="elevation-12">
                    <v-toolbar dark color="blue darken-4">
                        <v-toolbar-title>Ingrese los datos para registrarse</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text>
                        <v-form>
                            <v-text-field
                                color="blue darken-2"
                                prepend-icon="email"
                                name="email"
                                v-model="email"
                                label="Email"
                                type="text"
                                required>
                            </v-text-field>

                            <v-text-field
                                color="blue darken-2"
                                prepend-icon="lock"
                                name="password"
                                v-model="password"
                                label="Contraseña"
                                type="password"
                                required>
                            </v-text-field>

                            <v-text-field
                                color="blue darken-2"
                                prepend-icon="email"
                                name="email"
                                v-model="firstName"
                                label="Nombre"
                                type="text"
                                required>
                            </v-text-field>

                            <v-text-field
                                color="blue darken-2"
                                prepend-icon="email"
                                name="email"
                                v-model="lastName"
                                label="Apellido"
                                type="text"
                                required>
                            </v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :loading="loading" :disabled="loading" color="success"
                        @click="submitSignup()"
                        @click.native="loader = 'loading', snackbarlogin = true"
                        >
                            Crear cuenta
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</v-content>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';
import axios from 'axios';
import config from '../config';

const apiURL = 'http://' + config.apiHost;

export default {
    data () {
        return {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            timeout: 10000,
            error: '',
            snackbarlogin: false,
            loader: null,
            loading: false
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

            setTimeout(() => (this[l] = false), 3000);

            this.loader = null;
        }
    },

    methods: {
        submitSignup () {
            axios.get(apiURL + '/api/bcaccounts/currentCounter').then(res => {
                //console.log('CURRENT ETHEREUM ACCOUNT:', web3.eth.accounts[res.data.currentCounter]);
                // Passing the userdata in an object as payload to the signup action
                this.$store.dispatch('signUp', {
                    email: this.$data.email,
                    password: this.$data.password,
                    firstName: this.$data.firstName,
                    lastName: this.$data.lastName,
                    bcAccount: res.data.currentCounter
                });
            })
            .catch(err => {
                if (err.response.status == 404 && !err.response.data.success) {
                    //console.log('CURRENT ETHEREUM ACCOUNT:', web3.eth.accounts[0]);
                    this.$store.dispatch('signUp', {
                        email: this.$data.email,
                        password: this.$data.password,
                        firstName: this.$data.firstName,
                        lastName: this.$data.lastName,
                        bcAccount: 0
                    });
                }
            });
        },

        ...mapActions([
            'signUp'
        ])
    }
}

</script>

