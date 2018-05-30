

export default {

    GET_TX_HASHES_BY_ID: (state) => {
        return state.bcTxHashes.hashes;
    },
    
    GET_ALL_TX_HASHES_BY_ID: (state) => {
        return state.bcAllTxHashes;
    },

    getUser: (state) => {
        return state.user;
    },

    getErrorMessage: (state) => {
        return state.errorMessage;
    },

    getBcAccounts: (state) => {
        return state.bcAccounts;
    },

    getBcAccountData: (state) => {
        return state.bcAccountData;
    },

    getTransactionInfo: (state) => {
        return state.transactionInfo;
    },

    getAllTransactions: (state) => {
        return state.transactions;
    },

    getUserDataByAccount: (state) => {
        return state.userDataByAccount;
    },

    getParentDataByAccount: (state) => {
        return state.parentDataByAccount;
    }

};
