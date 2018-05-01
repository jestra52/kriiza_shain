<template>
    <div id="signup" class="form-signup">
        <div id="topBar">
            <h3 id="titlePP">SHAIN</h3>
            <table id="options" align="right" name="options">
                <tr>
                    <th>
                        <router-link to="/">
                            <a class="btn btn-light">
                                <span class="btn btn-light btnProfile">Inicio</span> 
                            </a>
                        </router-link>
                    </th>
                    <th>
                        <router-link to="/login">
                            <a class="btn btn-light btnProfile">
                                <span class="btn btn-light">Iniciar sesión</span> 
                            </a>
                        </router-link>
                    </th>
                    <th>
                        <router-link to="/signup">
                            <a class="btn btn-light btnProfile">
                                <span class="btn btn-light">Crear cuenta</span> 
                            </a>
                        </router-link>
                    </th>
                </tr>
            </table>
        </div>
        <h3>Nuevo usuario</h3>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div id="box-signup">
            <input type="text" class="form-control" id="email" v-model="email" placeholder="Email">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Contraseña">
            <input type="text" class="form-control" id="firstName" v-model="firstName" placeholder="Nombre">
            <input type="text" class="form-control" id="lastName" v-model="lastName" placeholder="Apellido">
        </div>
        <div id="btnLogin">
            <button class="btn btn-primary btn-form" @click="submit()">crear cuenta</button>
        </div>
        <p id="demo"></p>
        <div  id="botBar">
            <h5 id="creado"> Creado por la compañia Kriiza </h5>
            <table id="infoBot">
                <tr>
                    <th id="derechos">
                        <h5>Todos los derechos reservados   2018</h5>
                    </th>
                </tr>
            </table>
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