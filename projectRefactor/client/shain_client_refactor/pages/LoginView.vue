<template>
<v-content>

    <v-jumbotron height="auto" dark>
        <v-container fill-height>
            <v-layout align-center>
                    <div v-if="getUser != null && getUser.isLoggedIn != false">
                        <v-flex xs12>
                            <h3 class="display-3">¡Hola {{ getUser.data.firstName }}!</h3>
                            <span class="subheading">
                                <p>Has ingresado exitosamente</p>
                                <p>¡Tiempo sin verte!</p>
                            </span>

                            <v-snackbar top vertical :timeout=timeout v-model="snackbarlogin" auto-height>
                                <p>¡Bienvenido {{ getUser.data.firstName }}!</p>
                                <v-btn flat color="blue" @click.native="snackbarlogin = false">Cerrar</v-btn>
                            </v-snackbar>
                        </v-flex>

                        <v-flex xs12>
                            <img src="/static/awsface.png">
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
                        <v-toolbar-title>Ingrese con su cuenta</v-toolbar-title>
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
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :loading="loading" :disabled="loading" color="success"
                        @click="signin()"
                        @click.native="loader = 'loading', snackbarlogin = true"
                        >
                            Iniciar sesión
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

export default {
    data () {
        return {
            email: '',
            password: '',
            timeout: 6000,
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
        signin () {
            // Passing the email and password in an object as payload to the login action
            this.$store.dispatch('login', {
                email: this.$data.email,
                password: this.$data.password
            });
        },

        closeSession () {
            this.$store.dispatch('logout');
        },

        ...mapActions([
            'message',
            'login',
            'logout'
        ])
    }
}

</script>

<style scoped>
</style>
