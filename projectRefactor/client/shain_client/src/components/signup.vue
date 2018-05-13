<template>
    <div class="container">

        <div id="signup">
            <h3>Ingrese los datos para registrarse</h3>

            <!-- Grid row -->
            <div class="form-row">
                <!-- Grid column -->
                <div class="col-md-6">
                    <div class="md-form form-group">
                        <input type="email" class="form-control" id="email" v-model="email" placeholder="Email">
                    </div>
                </div>

                <!-- Grid column -->
                <div class="col-md-6">
                    <div class="md-form form-group">
                        <input type="password" class="form-control" id="password" v-model="password" placeholder="Contraseña">
                    </div>
                </div>

                <!-- Grid column -->
                <div class="col-md-12">
                    <div class="md-form form-group">
                        <input type="text" class="form-control" id="firstName" v-model="firstName" placeholder="Nombre">
                    </div>
                </div>

                <!-- Grid column -->
                <div class="col-md-12">
                    <div class="md-form form-group">
                        <input type="text" class="form-control" id="lastName" v-model="lastName" placeholder="Apellido">
                    </div>
                </div>
            </div>
            <!-- Grid row -->

            <button class="btn btn-primary btn-form" @click="submit()">Crear cuenta</button>

            <div class="alert alert-danger" v-if="getErrorMessage != null && getErrorMessage.message">
                <p>{{ getErrorMessage.message }}</p>
            </div>

            <!--Success message-->
            <a class="btn btn-success" onclick="toastr.success('Hi! I am success message.');">Success message</a>

            <div class="alert alert-success" v-if="getUser.isLoggedIn != false">
                <p>El usuario se ha registrado exitosamente con la cuenta {{ getUser.data.bcAccount.accountHash }} de la red Blockchain</p>
            </div>
        </div>

    </div>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';
import { store } from '../store/store';
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
            error: '',
            success: ''
        }
    },

    computed: {
        ...mapGetters([
            'getUser',
            'getErrorMessage'
        ])
    },

    store,

    methods: {
        submit () {
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

<style scoped>

</style>
