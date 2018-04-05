'use strict';

/*********************************************************************************
 * REQUIRES AND VARIABLES
 *********************************************************************************/
const express = require('express');
const logger  = require('morgan');
const app     = express();
const router  = express.Router();

/*********************************************************************************
 * APP CONFIGURATION
 *********************************************************************************/
app.use(logger('dev'));
router.get('/', (req, res) => {
    res.send('OK!');
});
app.use('/', router);

/*********************************************************************************
 * APP WEB SERVER CONFIGURATION 
 *********************************************************************************/
var appServer = app.listen(3000, () => {
    console.log('App running on port 3000');
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
