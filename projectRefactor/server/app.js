'use strict';

/*********************************************************************************
 * REQUIRES AND VARIABLES
 *********************************************************************************/
const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
//const cookieParser = require('cookie-parser');
const cors         = require('cors');
const mongoose     = require('mongoose');
const config       = require('./config/config');
const app          = express();

/*********************************************************************************
 * APP CONFIGURATION
 *********************************************************************************/
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cookieParser());

// Routes
const apiRoutes = require('./routes/apiRoutes');
// Routes settings
app.use('/api', apiRoutes);

/*********************************************************************************
 * DATABASE CONFIGURATION 
 *********************************************************************************/
// Database connection
mongoose.connect(config.db, (err, res) => {
    if (err) {
        console.error('Error connecting to database');
        throw err;
    }

    var databaseResponse = {
        dbHost: res.host,
        dbPort: res.port,
        dbUserConnected: res.user,
    };
    
    console.log('Connected to database', config.db);
    console.log('Database response:', databaseResponse);
});

/*********************************************************************************
 * APP WEB SERVER CONFIGURATION 
 *********************************************************************************/
var appServer = app.listen(config.port, () => {
    console.log(`App running on ${ config.host }:${ config.port }...`);
})

// Cleaning project instances
process.on('SIGINT', () => {
    setTimeout(() => {
        appServer.close(() => {
            console.log('App server is stopping...');
            mongoose.connection.close();
            process.exit(0);
        });
    }, 500);
});

module.exports = appServer;
