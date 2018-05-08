module.exports = {

    host: '10.131.137.243' || process.env.CLIENT_HOST,
    port: 8080 || process.env.CLIENT_PORT,
    proxyTable: {
        '/': {
            target: 'http://localhost:8080',
            changeOrigin: true
        }
    }

};
