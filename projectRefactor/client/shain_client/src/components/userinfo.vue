<template>
    <div class="container" v-if="getUser != null && getUser.isLoggedIn != false">
        <div class="jumbotron">
            <p id="fullname">Nombre: {{ getUser.data.firstName }} {{ getUser.data.lastName }}</p>
            <p id="emailinfo">E-mail: {{ getUser.data.email }}</p>
            <h2 id="transactionsReceived">Transacciones recibidas</h2>
            <div v-if="getUser.data.bcAccount.transactionsReceived != undefined && !getUser.data.bcAccount.transactionsReceived.length <= 0">
                <div v-for="accountTsctn in getUser.data.bcAccount.transactionsReceived" :key="accountTsctn.id">
                    <p>{{ accountTsctn }}</p>
                </div>
            </div>
            <div v-else>
                <p>No hay historial de transacciones recibidas :(</p>
            </div>

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

<style scoped></style>
