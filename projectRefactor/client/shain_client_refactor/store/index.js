import Vue from 'vue';
import Vuex from 'vuex';

import getters from 'store/getters';
import mutations from 'store/mutations';
import actions from 'store/actions';

Vue.use(Vuex);

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
            parentDataByAccount: {},
            transactions: {},
            errorMessage: {},
            bcAccounts: {},
            bcAccountData: {},
            bcContractTransactions: {},
            bcTxHashes: {},
            bcAllTxHashes: {}
        },

        actions,

        mutations,

        getters
    })
};
