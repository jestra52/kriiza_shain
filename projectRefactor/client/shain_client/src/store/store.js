import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        token: '',
    },
    getters: {
        getToken: (state) => {
            return token;
        }
    },
    mutations: {
        makeToken: (state, t) => {
            state.token = t;
        }
    },

});