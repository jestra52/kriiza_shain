<template>
    <div id="signup" class="form-signup">

        <h3>Nuevo usuario</h3>

        <div class="alert alert-danger" v-if="getErrorMessage != null && getErrorMessage.message">
            <p>{{ getErrorMessage.message }}</p>
        </div>

        <div class="alert alert-success" v-if="getUser.isLoggedIn != false">
            <p>El usuario se ha registrado con la cuenta {{ getUser.data.bcAccount.accountHash }} de la red Blockchain</p>
        </div>

        <div id="box-signup">
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Email">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Contraseña">
            <input type="text" class="form-control" id="firstName" v-model="firstName" placeholder="Nombre">
            <input type="text" class="form-control" id="lastName" v-model="lastName" placeholder="Apellido">
        </div>

        <div id="btnLogin">
            <button class="btn btn-primary btn-form" @click="submit()">Crear cuenta</button>
        </div>

    </div>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';
import { store } from '../store/store';
import axios from 'axios';

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
            axios.get('http://127.0.0.1:3000/api/bcaccounts/currentCounter').then(res => {
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
