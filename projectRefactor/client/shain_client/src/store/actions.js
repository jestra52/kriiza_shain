import Web3 from "web3";
import axios from 'axios';
import config from "../config";

const web3 = new Web3();
const apiURL = 'http://' + config.apiHost + ':' + config.apiPort;

web3.setProvider(new web3.providers.HttpProvider(config.ethNetwork));

export default {

    login: (context, userInfo) => {
        axios.post(apiURL + '/api/auth/login', {
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

                /*context.commit('addError', {
                    status: err.response.status,
                    data: err.response.data
                });*/
            });
    },

    // To do in API
    logout: (context) => {
        if (context.state.user.token) {
            context.commit('removeWebToken');
            context.commit('addUserData', {});
            context.commit('addBcAccounts', {});
            context.commit('addBcAccountData', {});
            context.commit("addBalanceVerde", 0);
            context.commit("addBalanceTostado", 0);
            context.commit("addTransactionInfo", {});
            context.commit('addTotalTransactions', {});
            context.commit('addUserDataFromAccount', {});
            context.commit("addError", {});
        }
    },

    currentBalanceVerde: (context, balanceVerde) => {
        context.commit('addBalanceVerde', balanceVerde);
    },

    currentBalanceTostado: (context, balanceTostado) => {
        context.commit('addBalanceTostado', balanceTostado);
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

            axios.get(apiURL + '/api/user/' + id, opts).then(res => {
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

            axios.get(apiURL + '/api/bcaccounts/', opts).then(res => {
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

    getTransactions: (context) => {
        axios.get(apiURL + '/api/bctransactions').then(res => {
            console.log("RESPONSE:", {
                status: res.status,
                data: res.data.transactions
            });

            context.commit('addTotalTransactions', res.data.transactions);
        })
            .catch(err => {
                console.log("RESPONSE:", {
                    status: err.response.status,
                    data: err.response.data
                });
            });
    },

    getAccountByUserId: (context) => {
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

            axios.get(apiURL + '/api/bcaccount/' + id, opts)
                .then(res => {
                    console.log("RESPONSE:", {
                        status: res.status,
                        data: res.data.accountData
                    });

                    context.commit('addBcAccountData', res.data.accountData);
                })
                .catch(err => {
                    console.log("RESPONSE:", {
                        status: err.response.status,
                        data: err.response.data
                    });
                });
        }
    },

    createTransaction: (context, tsctn) => {
        if (!context.state.user.isLoggedIn) {
            console.log('USER NOT AUTHENTICATED');
        }
        else {
            let id   = context.state.user.data._id;
            console.log("id: " +id);
            let opts = {
                headers: {
                    'Authorization': 'Bearer ' + context.state.user.token
                }
            };
            let data = {
                transactionInfo: {
                    to: tsctn.to,
                    toName: tsctn.toName,
                    content: tsctn.content
                },
                transactionHash: tsctn.transactionHash,
                parentTransactionHash: tsctn.parentTransactionHash // Este es opcional
            }

            axios.put(apiURL + '/api/bctransactions/create/' + id, data, opts)
                .then(res => {
                    console.log("RESPONSE:", {
                        status: res.status,
                        data: res.data
                    });

                    context.commit("addTransactionInfo", res.data.transactionCreated);
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
        axios.post(apiURL + '/api/user/create', {
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

                /*if (err.response.status == 500 && err.response.data.error)
                    context.commit('addError', {
                        status: err.response.status,
                        message: "El usuario no se ha podido crear"
                    });
                else if (err.response.status == 409 && !err.response.data.success)
                    context.commit('addError', {
                        status: err.response.status,
                        message: "Ya se a creado un usuario con este email"
                    });*/
            });
    },

    getUserByAccount: (context, bcaccount) => {
        if (!context.state.user.isLoggedIn) {
            console.log('USER NOT AUTHENTICATED');
        }
        else {

            let opts = {
                headers: {
                    'Authorization': 'Bearer ' + context.state.user.token,
                    'bcaccount': bcaccount
                }
            };

            axios.get(apiURL + '/api/users/getbyaccount', opts).then(res => {
                console.log("RESPONSE:", {
                    status: res.status,
                    data: res.data.userData
                });

                context.commit('addUserDataFromAccount', res.data.userData);
            })
            .catch(err => {
                console.log("RESPONSE:", {
                    status: err.response.status,
                    data: err.response.data
                });
            });

        }

    }

}
