/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../server');
chai.use(require('chai-http'));

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const should = chai.should();


