<template>
    <div class="container">

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

    </div>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';
import { store } from '../store/store';

export default {
    data () {
        return {
            email: '',
            password: '',
            error: ''
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
            // Passing the email and password in an object as payload to the login action
            this.$store.dispatch('login', {
                email: this.$data.email,
                password: this.$data.password
            });
        },

        logout () {
            this.$store.dispatch('logout');
        },

        ...mapActions([
            'login',
            'logout'
        ])
    }
}

</script>

<style scoped>
</style>
