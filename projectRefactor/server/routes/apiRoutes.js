'use strict';

const apiRouter      = require('express').Router();
const userController = require('../controllers/user/exports');

apiRouter.get('/', (req, res) => {
    res.send('OK!');
});

apiRouter.get('/user/:id', userController.getById);
apiRouter.post('/user/create', userController.create);

module.exports = apiRouter;
