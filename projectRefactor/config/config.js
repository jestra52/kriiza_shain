'use strict';

const normalize = require('normalize-path');

module.exports = {

    host: '120.0.0.1' || process.env.HOST,
    port: '3000' || process.env.PORT,
    db: 'mongodb://127.0.0.1/easygames' || process.env.DB_HOST,
    rootPath: normalize(process.cwd()),
    app: {
        name: 'kriiza_shain'
    }

};
