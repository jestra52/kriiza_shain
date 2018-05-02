<template>
    <div id="login" class="form-login">
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
        <h3>Ingrese con su cuenta</h3>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div id="box-login">
            <input type="text" class="form-control" id="email" v-model="email" placeholder="Email">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Contraseña">
        </div>
        <div id="btnLogin">
            <button class="btn btn-primary" @click="submit()">Ingresar</button>
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
                router.push('/index')
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