'use strict';

export default {

    apiHost: process.env.API_HOST || '127.0.0.1:3000',
    ethNetwork: process.env.ETH_NETWORK || 'http://127.0.0.1:7545',
    app: {
        name: 'kriiza_shain_client'
    }

};
