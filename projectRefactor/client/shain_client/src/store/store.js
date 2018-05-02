import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Web3 from 'web3';

const web3 = new Web3();

Vue.use(Vuex);
web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:7545'));

export const store = new Vuex.Store({
    strict: true,

    state: {
        user: {
            data: {},
            isLoggedIn: false,
            token: ''
        },
        errorMessage: {}
    },

    getters: {
        getUser: (state) => {
            return state.user;
        },

        getErrorMessage: (state) => {
            return state.errorMessage;
        }
    },

    mutations: {
        addWebToken: (state, token) => {
            state.user.token = token;
            state.user.isLoggedIn = true;
        },

        addUserData: (state, userData) => {
            state.user.data = userData;
        },

        addError: (state, errorMessage) => {
            state.errorMessage = errorMessage;
        }
    },

    actions: {
        login: (context, userInfo) => {
            axios.post('http://127.0.0.1:3000/api/auth/login', {
                email: userInfo.email,
                password: userInfo.password
            })
            .then(function (response) {
                console.log("RESPONSE:", {
                    status: response.status,
                    data: response.data
                });

                context.commit('addWebToken', response.data.token);
                context.commit('addUserData', response.data.userData);
                //router.push('/index')
            })
            .catch(function (err) {
                console.log("RESPONSE:", {
                    status: err.response.status,
                    data: err.response.data
                });

                context.commit('addError', {
                    status: err.response.status,
                    data: err.response.data
                });
            });
        },

        // To do in API
        logout: () => {},

        signUp: (context, userInfo) => {
            axios.post('http://127.0.0.1:3000/api/user/create', {
                    email: userInfo.email,
                    password: userInfo.password,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    bcAccount: web3.eth.accounts[userInfo.bcAccount]
                })
                .then(function (res) {
                    console.log("RESPONSE:", {
                        status: res.status,
                        data: res.data
                    });

                    context.commit('addWebToken', res.data.token);
                    context.commit('addUserData', res.data.userStored);
                })
                .catch(function (err) {
                    console.log("RESPONSE:", {
                        status: err.response.status,
                        data: err.response.data
                    });

                    if (err.response.status == 500 && err.response.data.error)
                        context.commit('addError', {
                            status: err.response.status,
                            message: "El usuario no se ha podido crear"
                        });
                    else if (err.response.status == 409 && !err.response.data.success)
                        context.commit('addError', {
                            status: err.response.status,
                            message: "Ya se a creado un usuario con este email"
                        });
                });
        }
    }

});
