'use strict';

const express = require('express');
const logger  = require('morgan');
const config  = require('./config/config');
const app     = express();

// Routes
const apiRoutes = require('./routes/apiRoutes');

/*********************************************************************************
 * APP CONFIGURATION
 *********************************************************************************/
app.use(logger('dev'));

// Routes config
app.use('/api', apiRoutes);

/*********************************************************************************
 * WEB APP SERVER CONFIGURATION 
 *********************************************************************************/
var appServer = app.listen(config.port, () => {
    console.log('App running on', config.host, ':', config.port);
})

// Cleaning project instances
process.on('SIGINT', () => {
    setTimeout(() => {
        appServer.close(() => {
            console.log('App server is stopping...');
            //mongoose.connection.close();
            process.exit(0);
        });
    }, 500);
});
