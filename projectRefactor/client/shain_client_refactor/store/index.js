import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
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
            userDataByAccount: {},
            transactions: {},
            errorMessage: {},
            bcAccounts: {},
            bcAccountData: {}
        },

        actions: {},

        mutations: {},

        getters: {}
    })
}
