<template>
    <div id="login">
        <h1>SHAIN</h1>
        <h3>Ingrese Con Su Cuenta</h3>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div id="box-login">
            <input type="text" id="email" v-model="email" placeholder="Email">
            <input type="password" id="password" v-model="password" placeholder="Contraseña">
        </div>
        <div>
            <button class="btn btn-primary" @click="submit()">Ingresar</button>
            <router-link to="/signup">¿No tienes una cuenta?</router-link>
        </div>
    </div>
</template>

<script>

const axios = require('axios');
import {mapActions} from 'vuex';

export default {
    data () {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    
    methods: {
        submit () { 
            var self = this;           
            axios.post('http://127.0.0.1:3000/api/auth/login', {
                email: this.$data.email,
                password: this.$data.password
            })
            .then(function (response) {
                makeToken(response.token);
            })
            .catch(function (err) {
                if (err.response.status == 404 && !err.response.data.success)
                    self.error = "El usuario no existe";
            });
            
        },
        ...mapActions([
            'makeToken'
        ])
    }
}
</script>

<style scoped>

</style>
