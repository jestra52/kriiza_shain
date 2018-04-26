'use strict';

process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai     = require('chai');
const chaiHttp = require('chai-http');
const bcrypt   = require('bcrypt');

const User   = require('../models/User');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('User requests', () => {

    // Before each test we empty the database
    beforeEach((done) => {
        User.remove({}, (err) => {
            done(); 
        });
    });

    // Test POST /api/user/create route
    describe('POST /api/user/create', () => {

        it('it should POST a user', (done) => {
            let userObj = {
                username: "jestra52",
                email: "jestra52@eafit.edu.co",
                password: "1234",
                firstName: "Juan",
                lastName: "Estrada"
            };

            chai.request(server).post('/api/user/create').send(userObj).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('message')
                                    .eql('User successfully created');
                res.body.should.have.property('userStored');
                res.body.userStored.should.be.a('object');
                res.body.userStored.should.have.property("username");
                res.body.userStored.should.have.property("email");
                res.body.userStored.should.have.property("password");
                res.body.userStored.should.have.property("firstName");
                res.body.userStored.should.have.property("lastName");

                done();
            });
        });
       
    });
    // --> End POST /api/user/create test

    // Test GET /api/user/:id route with records
    describe('GET /api/user/:id', () => {

        let date = new Date();
        let offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);

        it('it should GET a user by the given id', (done) => {
            let saltRounds = 12;
            let plainPassword = "1234";
            let user = new User({
                username: "jestra52",
                email: "jestra52@eafit.edu.co",
                password: bcrypt.hashSync(plainPassword, saltRounds),
                firstName: "Juan",
                lastName: "Estrada",
                createdAt: date.toISOString(),
                updatedAt: date.toISOString()
            });

            user.save((err, userStored) => {
                chai.request(server).get(`/api/user/${userStored._id}`)
                                    .end((errR, res) => {
                    
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('message')
                                        .eql('User successfully readed');
                    res.body.should.have.property('userData');
                    res.body.userData.should.be.a('object');
                    res.body.userData.should.have.property("username")
                                                 .eql(userStored.username);
                    res.body.userData.should.have.property("email")
                                                 .eql(userStored.email);
                    res.body.userData.should.have.property("password")
                                                 .eql(userStored.password);
                    bcrypt.compare(plainPassword, userStored.password, (errH, resH) => {
                        resH.should.be.true;
                    });
                    res.body.userData.should.have.property("firstName")
                                                 .eql(userStored.firstName);
                    res.body.userData.should.have.property("lastName")
                                                 .eql(userStored.lastName);
    
                    done();
                });
            });
        });

    });
    // --> End GET /api/user/:id test

});
