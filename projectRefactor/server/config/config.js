'use strict';

const normalize = require('normalize-path');

module.exports = {

    host: '120.0.0.1' || process.env.HOST,
    port: '3000' || process.env.PORT,
    db: 'mongodb://127.0.0.1/kriiza_shain' || process.env.DB_HOST,
    rootPath: normalize(process.cwd()),
    secret: 'CUM971007EVA01JOZ' || process.env.TOKEN_SECRET,
    tokenExpiresIn: 900,
    app: {
        name: 'kriiza_shain'
    }

};
