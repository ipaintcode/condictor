/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const request = require('supertest');
const { app, runServer, closeServer } = require('../server');
require('dotenv').config();

mongoose.Promise = global.Promise;
const agent = request.agent(app);
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const TEST_PORT = process.env.TEST_PORT;

process.on('unhandledRejection', (err, p) => {
  console.log('An unhandledRejection occurred');
  console.log(`Rejected Promise: ${p}, ${JSON.stringify(p)}`);
  console.log(`Rejection: ${err}`);
});

describe('Passport', () => {
  beforeEach((done) => {
    try {
      console.log('running server');
      runServer(TEST_DATABASE_URL, TEST_PORT)
        .then(() => done())
        .catch(err => new Error(err));
    } catch (err) {
      console.log('beforeEach err', err);
    }
  });

  afterEach((done) => {
    try {
      console.log('closing server');
      mongoose.connection.dropDatabase()
        .then(() => closeServer())
        .then(() => done())
        .catch(err => new Error(err));
    } catch (err) {
      console.log('afterEach fail', err);
    }
  });

  it('should create a new user and sign in', (done) => {
    agent
      .post('/signup')
      .send({ username: 'admin', password: 'test' })
      .then((res) => {
        expect(res.status).toEqual(201);
        done();
      });
  });
});
