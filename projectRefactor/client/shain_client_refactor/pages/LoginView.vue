<template>
<v-content>

    <v-jumbotron height="auto">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <div v-if="getUser != null && getUser.isLoggedIn != false">User state
                        {{ getUser }}
                        <v-snackbar top vertical :timeout=timeout v-model="snackbarlogin">
                            <p>Hola {{ getUser.data.firstName }}</p>
                            <v-btn flat color="blue" @click.native="snackbarlogin = false">Cerrar</v-btn>
                        </v-snackbar>
                    </div>
                </v-flex>
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
   <!-- <div class="container">

        <h3>Ingrese con su cuenta</h3>
        <div class="alert alert-danger" v-if="getErrorMessage != null && getErrorMessage.data">
            <p>{{ getErrorMessage.data }}</p>
        </div>

        <div id="login" class="md-form form">
            <input type="text" class="form-control" id="email" v-model="email" placeholder="Email">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Contraseña">

            <button class="btn btn-primary" @click="submit()">Ingresar</button>
        </div>

        <div v-if="getUser != null && getUser.isLoggedIn != false">User state
            {{ getUser }}
        </div>

    </div>-->
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

            setTimeout(() => (this[l] = false), 1000);

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
