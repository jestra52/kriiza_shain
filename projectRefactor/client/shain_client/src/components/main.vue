<template>
    <div id="main">
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
        </div>

        <div id="undermine">
            <input type="text" class="form-control" id="hash" v-model="hash" placeholder="Ingrese el hash del producto">
            <button class="btn btn-primary btn-form" id="start" @click="submit()">Comenzar</button>
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
            hash: ''
        }
    },

    methods: {
        submit () {
            var self = this;
            axios.post('http://127.0.0.1:3000/api/user/create', {
                hash: this.$data.hash,
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
