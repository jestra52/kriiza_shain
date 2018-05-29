'use strict';

const apiRouter = require('express').Router();
const jwt       = require('jsonwebtoken');

const userController       = require('../controllers/user/exports');
const authController       = require('../controllers/auth/exports');
const bcaccountsController = require('../controllers/bcaccounts/exports');
const bctsctnController    = require('../controllers/bctransactions/exports');
const hashController       = require('../controllers/hash/exports');
const config               = require('../config/config');

apiRouter.get('/', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.send('OK!');
    
});

let verifyToken = (req, res, next) => {
    // Get auth header value
    let bearerHeader = req.headers.authorization;
    // Check if bearer is not undefined
    //console.log('TOKEN FROM REQUEST:', bearerHeader);    
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        // Bearer <access_token>
        let bearerToken = bearerHeader.split(' ')[1];
        // Set the token
        req.token = bearerToken;

        jwt.verify(req.token, config.secret, (err, authData) => {
            if (err) {
                req.user = undefined;

                if (err.expiredAt) {
                    let offset = err.expiredAt.getTimezoneOffset();
                    err.expiredAt.setMinutes(err.expiredAt.getMinutes() - offset);
                }
                
                return res.status(500).json({
                    success: false,
                    message: 'There was a problem verifying the token',
                    errors: err
                });

                throw err;
            }

            req.user = authData;
            next();
        });
    }
    else {
        // Forbidden
        req.user = undefined;
        return res.status(403).json({
            success: false,
            message: 'Forbidden - unauthorized'
        });
    }
};

// Middlewares to verify
//apiRouter.all('/user/:id', verifyToken);
//apiRouter.all('/users', verifyToken);

apiRouter.get('/user/:id', verifyToken, userController.getById);
apiRouter.get('/users/getbyaccount', verifyToken, userController.getByAccount);
apiRouter.post('/user/create', userController.create);
apiRouter.get('/users', verifyToken, userController.getAll);

apiRouter.post('/auth/login', authController.login);

apiRouter.get('/bcaccounts/currentCounter', bcaccountsController.getCurrentCounter);
apiRouter.get('/bcaccounts', verifyToken, bcaccountsController.getAccounts);
apiRouter.get('/bcaccount/:id', verifyToken, bcaccountsController.getAccountByUserId);

apiRouter.put('/bctransactions/create/:id', verifyToken, bctsctnController.create);
apiRouter.get('/bctransactions/', bctsctnController.getAll);

apiRouter.get('/hash/:id', verifyToken, hashController.get);
apiRouter.get('/hash/getallby/:id', verifyToken, hashController.getAllByUserId);
apiRouter.post('/hash/create/:id', verifyToken, hashController.create);
apiRouter.put('/hash/update/:id', verifyToken, hashController.update);

module.exports = apiRouter;
