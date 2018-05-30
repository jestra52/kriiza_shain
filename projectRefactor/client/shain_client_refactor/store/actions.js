import Web3 from "web3";
import axios from 'axios';
import config from "../config";

const web3 = new Web3();
const apiURL = 'http://' + config.apiHost;

console.log('CONNECTED TO:', apiURL);
console.log('CONNECTED TO:', config.ethNetwork);

web3.setProvider(new web3.providers.HttpProvider(config.ethNetwork));

export default {

    getHashesByUserId: (context) => {
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

            axios.get(apiURL + '/api/hash/getallby/' + id, opts).then(res => {
                let array = [];

                res.data.hashes.forEach(hash => {
                    console.log('HASH', hash.txHash);

                    //let hola =  getATxByHash('0x6cd9536223281043004402daabfa4bbac38b3d303bd511cf362daafe3eac8b8b', opts);
                    //console.log('TX', hola);

                    axios.get(apiURL + '/api/contract/' + hash.txHash, opts).then(resH => {
                        //console.log('SFSFSSFSFS', resH);
                        array.push(resH.data.data[4].value + " KG de " + resH.data.data[0].value);

                        console.log("RESPONSE:", {
                            status: res.status,
                            data: res.data
                        });

                        context.commit('addTxHashes', {
                            hashes: res.data.hashes,
                            hashesValues: array
                        });
                    })
                    .catch(errH => {
                        console.log("RESPONSE:", {
                            status: errH.response.status,
                            data: errH.response.data
                        });
                    });
                });


            })
            .catch(err => {
                console.log("RESPONSE:", {
                    status: err.response.status,
                    data: err.response.data
                });
            });
        }
    },

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
            context.commit('addParentDataFromAccount', {});
            context.commit('addUserDataFromAccount', {});
            context.commit('addParentDataFromAccount', {});
            context.commit('addTxHashes', {});
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

    },

    getParentByAccount: (context, bcaccount) => {
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

                context.commit('addParentDataFromAccount', res.data.userData);
            })
            .catch(err => {
                console.log("RESPONSE:", {
                    status: err.response.status,
                    data: err.response.data
                });
            });

        }

    },

    removeParentDataByAccount: (context) => {
        if (!context.state.user.isLoggedIn) {
            console.log('USER NOT AUTHENTICATED');
        }
        else {
            context.commit('addParentDataFromAccount', {});
        }

    }

}
