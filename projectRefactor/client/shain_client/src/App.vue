<template>
    <div id="app">
        <div id="topBar">
            <h3 id="titlePP">SHAIN</h3>
            <table id="options" align="right" name="options">
                <tr v-if="getUser.isLoggedIn == false">
                    <th>Hola</th>
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
                <tr v-else>
                    <th> Hola! {{getUser.data.firstName}} {{getUser.data.lastName}}</th>
                    <th>
                        <router-link to="/">
                            <a class="btn btn-light">
                                <span class="btn btn-light btnProfile">Inicio</span>
                            </a>
                        </router-link>
                    </th>

                    <th>
                        <router-link to="/transaction">
                            <a class="btn btn-light btnProfile">
                                <span class="btn btn-light">Transacciones</span>
                            </a>
                        </router-link>
                    </th>

                    <th>
                        <router-link to="/">
                            <a class="btn btn-light btnProfile">
                                <span class="btn btn-light" @click="logout()">Cerrar sesión</span>
                            </a>
                        </router-link>
                    </th>
                </tr>

            </table>
        </div>

        <div class="container">
            <router-view></router-view>
        </div>

        <!-- MODIFICAR PARA QUE SE VEA BOTON "VER TRANSACCIONES"
        <p id="demo"></p>
        <footer id="botBar">
            <h5 id="creado"> Creado por la compañia Kriiza </h5>
            <table id="infoBot">
                <tr>
                    <th id="derechos">
                        <h5>Todos los derechos reservados   2018</h5>
                    </th>
                </tr>
            </table>
        </footer>-->

    </div>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';
import { store } from "./store/store";

export default {

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

<style>

@import 'assets/style.css';
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css";
body{
    font-family: Ubuntu;
    color: #555;
}

</style>
