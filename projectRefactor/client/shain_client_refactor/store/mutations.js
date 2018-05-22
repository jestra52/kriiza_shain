export default {

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

    addBcAccountData: (state, bcAccount) => {
        state.bcAccountData = bcAccount;
    },

    addBalanceVerde: (state, balanceVerde) => {
        state.transactionInfo.balances.verde = balanceVerde;
    },

    addBalanceTostado: (state, balanceTostado) => {
        state.transactionInfo.balances.tostado = balanceTostado;
    },

    addTransactionInfo: (state, transactionInfo) => {
        state.transactionInfo = transactionInfo;
    },

    addTotalTransactions: (state, transactions) => {
        state.transactions = transactions;
    },

    addError: (state, errorMessage) => {
        state.errorMessage = errorMessage;
    },

    addUserDataFromAccount: (state, userData) => {
        state.userDataByAccount = userData;
    },

    addParentDataFromAccount: (state, parentData) => {
        state.parentDataByAccount = parentData;
    },

};
