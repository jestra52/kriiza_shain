//const config = require('./src/config');

module.exports = {

    host: process.env.CLIENT_HOST,
    port: process.env.CLIENT_PORT,
    proxyTable: {
        '/': {
            target: 'http://localhost:8080',
            changeOrigin: true
        }
    }

};
