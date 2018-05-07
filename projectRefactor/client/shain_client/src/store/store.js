import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({

    strict: true,

    plugins: [ createPersistedState() ],

    state: {
        user: {
            data: {},
            isLoggedIn: false,
            token: ''
        },
        transactionInfo: {
            balances: {
                verde: 0,
                tostado: 0
            }
        },
        transactions: {},
        errorMessage: {},
        bcAccounts: {},
        bcAccountData: {}
    },

    getters,

    mutations,

    actions

});
