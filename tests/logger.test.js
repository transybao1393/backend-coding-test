'use strict';

const { response } = require('express');
const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

const {logger} = require('../src/services/winston');

// logger.transports.forEach((t) => (t.silent = true));

// describe('Winston logger test', () => {
//     before((done) => {
//         db.serialize((err) => { 
//             if (err) {
//                 return done(err);
//             }

//             buildSchemas(db);

//             done();
//         });
//     });

//     describe('GET /health', () => {
//         it('should return health status code', (done) => {
//             request(app)
//                 .get('/health')
//                 .expect('Content-Type', /text/)
//                 .expect(200, done);
//         });
//     });

// });