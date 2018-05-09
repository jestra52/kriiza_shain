'use strict';

const normalize = require('normalize-path');

export default {

    apiHost: 'http://pi2shain.dis.eafit.edu.co' || process.env.API_HOST,
    ethNetwork: 'http://pi2shain.dis.eafit.edu.co/bcnet' || process.env.ETH_NETWORK,
    rootPath: normalize(process.cwd()),
    app: {
        name: 'kriiza_shain_client'
    }

};
