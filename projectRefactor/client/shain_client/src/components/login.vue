<template>
    <div id="login" class="form-login">
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
                        <router-link to="/transaction">
                            <a class="btn btn-light btnProfile">
                                <span class="btn btn-light">Transacciones</span>
                            </a>
                        </router-link>
                    </th>
                </tr>
                
            </table>
        </div>
        <h3>Ingrese con su cuenta</h3>
        <div class="alert alert-danger" v-if="getErrorMessage.data">
            <p>{{ getErrorMessage.data }}</p>
        </div>

        <div id="box-login">
            <input type="text" class="form-control" id="email" v-model="email" placeholder="Email">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Contraseña">
        </div>
        <div id="btnLogin">
            <button class="btn btn-primary" @click="submit()">Ingresar</button>
        </div>


        <div>User state
            {{ getUser }}
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

        ...mapActions([
            'login'
        ])
    }
}

</script>

<style scoped>
</style>
