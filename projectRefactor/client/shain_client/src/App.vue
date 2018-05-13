<template>
    <div id="app">

        <header>
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                </div>

                <div class="mx-auto order-0">
                    <a class="navbar-brand mx-auto" href="/">SHAIN</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                </div>
            </nav>

            <nav class="navbar navbar-expand-md navbar-dark black">
                <div class="navbar-collapse collapse w-200 order-1 order-md-0 dual-collapse2">
                    <ul class="navbar-nav mr-auto" v-if="getUser.isLoggedIn == false">
                        <li class="nav-item">
                            <router-link to="/">
                                <a class="nav-link">Inicio</a>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/login">
                                <a class="nav-link">Iniciar sesión</a>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/signup">
                                <a class="nav-link">Crear cuenta</a>
                            </router-link>
                        </li>
                    </ul>

                    <ul class="navbar-nav mr-auto" v-else>
                        <li class="nav-item">
                            <router-link to="/">
                                <a class="nav-link">Inicio</a>
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/transaction">
                                <a class="nav-link">Panel de transacción</a>
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/userinfo">
                                <a class="nav-link">Información del usuario</a>
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/">
                                <a class="nav-link" @click="logout()">Cerrar sesión</a>
                            </router-link>
                        </li>
                    </ul>
                </div>

                <div class="mx-auto order-0">
                </div>

                <div class="navbar-collapse collapse w-200 order-3 dual-collapse2" v-if="getUser.isLoggedIn == false">
                </div>
                <div class="navbar-collapse collapse w-200 order-3 dual-collapse2" v-else>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <span class="nav-link">¡Hola, {{ getUser.data.firstName}}!</span>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>


        <main class="container-fluid content" role="main">
            <router-view></router-view>
        </main>


        <!--Footer-->
        <footer class="page-footer font-small mdb-color lighten-3 pt-4 mt-4 sticky-bottom">

            <!--Footer Links-->
            <div class="container-fluid text-center text-md-left">
                <div class="row">

                    <!--First column-->
                    <div class="col-lg-6">
                        <h5 class="text-uppercase">Creado por Kriiza</h5>
                        <p>Grupo de estudiantes de ingeniería de sistemas de la Universidad EAFIT,
                        responsable de idear e implementar el proyecto Shain, el cual consiste en darle
                        un valor agregado a los productos del café y una seguridad al consumidor.</p>
                    </div>
                    <!--/.First column-->

                    <!--Second column-->
                    <div class="col-lg-6">
                        <h5 class="text-uppercase">Integrantes</h5>
                        <ul class="list-unstyled">
                            <li>
                                <a href="https://github.com/jestra52">Juan Carlos Estrada Alvarez</a>
                            </li>
                            <li>
                                <a href="https://github.com/NoNameOriginal">Christian Londoño Cañas</a>
                            </li>
                            <li>
                                <a href="https://github.com/jlondo96">Juan Pablo Londoño Botina</a>
                            </li>
                            <li>
                                <a href="https://github.com/gfernan6">Geralin Fernandez Bedoya</a>
                            </li>
                        </ul>
                    </div>
                    <!--/.Second column-->
                </div>
            </div>
            <!--/.Footer Links-->

            <!--Copyright-->
            <div class="footer-copyright py-3 text-center">
                © 2018 Copyright
            </div>
            <!--/.Copyright-->

        </footer>
        <!--/.Footer-->



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
//import bootstrap from 'bootstrap';

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

/*@import '../node_modules/bootstrap/dist/css/bootstrap.css';*/
@import 'assets/style.css';
body {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: #555;
}

</style>
