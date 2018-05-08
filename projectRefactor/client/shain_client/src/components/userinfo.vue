<template>
    <div v-if="getUser != null && getUser.isLoggedIn != false">
        <div id="fullname">Nombre: {{ getUser.data.firstName }} {{ getUser.data.lastName }}</div>
        <div id="emailinfo">E-mail: {{ getUser.data.email }}</div>
        <div id="transactionsReceived">Transacciones recibidas</div>
        <div v-if="getUser.data.bcAccount.transactionsReceived != undefined && !getUser.data.bcAccount.transactionsReceived.length <= 0">
            <div v-for="accountTsctn in getUser.data.bcAccount.transactionsReceived" :key="accountTsctn.id">
                {{ accountTsctn }}
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
