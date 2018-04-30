<template>
    <div id="login">
        <h1>SHAIN</h1>
        <h3>Nuevo usuario</h3>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div id="box-login">
            <input type="text" id="email" v-model="email" placeholder="Email">
            <input type="password" id="password" v-model="password" placeholder="Contraseña">
            <input type="text" id="firstName" v-model="firstName" placeholder="Nombre">
            <input type="text" id="lastName" v-model="lastName" placeholder="Apellido">
        </div>
        <div>
            <button class="btn btn-primary" @click="submit()">Ingresar</button>
            <router-link to="/">¿Ya tienes una cuenta?</router-link>
        </div>
    </div>
</template>

<script>

const axios = require('axios');

export default {
    data () {
        return {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            error: ''
        }
    },
    
    methods: {
        submit () { 
            var self = this;           
            axios.post('http://127.0.0.1:3000/api/user/create', {
                username: this.$data.email,
                password: this.$data.password,
                firstName: this.$data.firstName,
                lastName: this.$data.lastName
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (err) {
                if (err.response.status == 500)
                    self.error = "El usuario no se ha podido crear";
                else if (err.response.status == 409)
                    self.error = "Ya se a creado un usuario con este email";
            });
        }
    }
}
</script>

<style scoped>

</style>