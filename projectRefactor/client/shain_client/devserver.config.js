module.exports = {

    host: '127.0.0.1' || process.env.CLIENT_HOST,
    port: 8080 || process.env.CLIENT_PORT,
    proxyTable: {
        '/': {
            target: 'http://localhost:8080',
            changeOrigin: true
        }
    }

};
