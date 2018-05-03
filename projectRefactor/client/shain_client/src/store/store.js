import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
import Web3 from 'web3';

const web3 = new Web3();

Vue.use(Vuex);
web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:7545'));

export const store = new Vuex.Store({
    strict: true,

    plugins: [ createPersistedState() ],

    state: {
        user: {
            data: {},
            isLoggedIn: false,
            token: ''
        },
        transactionInfo: {},
        errorMessage: {},
        bcAccounts: {}
    },

    getters: {
        getUser: (state) => {
            return state.user;
        },

        getErrorMessage: (state) => {
            return state.errorMessage;
        },

        getBcAccounts: (state) => {
            return state.bcAccounts;
        },

        getTransactionInfo: (state) => {
            return state.transactionInfo;
        }
    },

    mutations: {
        addWebToken: (state, token) => {
            state.user.token = token;
            state.user.isLoggedIn = true;
        },

        removeWebToken: (state) => {
            state.user.token = '';
            state.user.isLoggedIn = false;
        },

        addUserData: (state, userData) => {
            state.user.data = userData;
        },

        addBcAccounts: (state, bcAccounts) => {
            state.bcAccounts = bcAccounts;
        },

        addTransactionInfo: (state, tscinfo) => {
            state.transactionInfo = tscinfo;
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
        logout: (context) => {
            if (context.state.user.token) {
                context.commit('removeWebToken');
                context.commit('addUserData', {});
                context.commit('addUserData', {});
                context.commit("addTransactionInfo", {});
                context.commit("addError", {});
            }
        },

        currentTransactionInfo: (context, transactionInfo) => {
            context.commit('addTransactionInfo', transactionInfo);
        },

        getUserInfo: (context, userInfo) => {
            if (!context.state.user.isLoggedIn) {
                console.log('USER NOT AUTHENTICATED');
            }
            else {
                let id   = context.state.user.data._id;
                let opts = {
                    headers: {
                        'Authorization': 'Bearer ' + context.state.user.token
                    }
                };

                axios.get('http://127.0.0.1:3000/api/user/' + id, opts).then(res => {
                    console.log("RESPONSE:", {
                        status: res.status,
                        data: res.data
                    });

                    context.commit('addUserData', res.data.userData);
                })
                .catch(err => {
                    console.log("RESPONSE:", {
                        status: err.response.status,
                        data: err.response.data
                    });
                });
            }
        },

        getAllAccounts: (context, bcAccounts) => {
            if (!context.state.user.isLoggedIn) {
                console.log('USER NOT AUTHENTICATED');
            }
            else {
                let id   = context.state.user.data._id;
                let opts = {
                    headers: {
                        'Authorization': 'Bearer ' + context.state.user.token
                    }
                };

                axios.get('http://127.0.0.1:3000/api/bcaccounts/', opts).then(res => {
                    console.log("RESPONSE:", {
                        status: res.status,
                        data: res.data.bcAccounts
                    });

                    context.commit('addBcAccounts', res.data.bcAccounts);
                })
                .catch(err => {
                    console.log("RESPONSE:", {
                        status: err.response.status,
                        data: err.response.data
                    });
                });
            }
        },

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
