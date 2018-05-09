'use strict';

const normalize = require('normalize-path');

export default {

    apiHost: '10.131.137.243' || process.env.API_HOST,
    apiPort: '3000' || process.env.API_PORT,
    ethNetwork: 'http://pi2shain.dis.eafit.edu.co/bcnet' || process.env.ETH_NETWORK,
    rootPath: normalize(process.cwd()),
    app: {
        name: 'kriiza_shain_client'
    }

};
