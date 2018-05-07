'use strict';

const normalize = require('normalize-path');

export default {

    apiHost: '127.0.0.1' || process.env.API_HOST,
    apiPort: '3000' || process.env.API_PORT,
    ethNetwork: 'http://127.0.0.1:7545' || process.env.ETH_NETWORK,
    rootPath: normalize(process.cwd()),
    app: {
        name: 'kriiza_shain_client'
    }

};
