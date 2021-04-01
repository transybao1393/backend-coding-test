'use strict';

const { response } = require('express');
const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// const app = require('../src/app')(db);

const {app} = require('../src/app');
require('../src/repository/RiderRepository').setDBInstance(db);

const buildSchemas = require('../src/schemas');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health status code', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('GET /health', () => {
        it('should return health text', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, 'Healthy', done);
        });
    });

    //- GET /rides test with pagination
    describe('GET /rides/paginate', () => {
        it('should return success with status 200', (done) => {
            request(app)
            .get('/rides/paginate')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });
    });

    describe('GET /rides/paginate', () => {
        it('should return success with all rides', (done) => {
            request(app)
            .get('/rides/paginate')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [
                {
                    "rideID": 1,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest1",
                    "driverName": "driverTest1",
                    "driverVehicle": "motorbike",
                    "created": "28-03-21 09:00:09 PM"
                },
                {
                    "rideID": 2,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest2",
                    "driverName": "driverTest2",
                    "driverVehicle": "motorbike",
                    "created": "28-03-21 09:00:09 PM"
                },
                {
                    "rideID": 3,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest3",
                    "driverName": "driverTest3",
                    "driverVehicle": "motorbike",
                    "created": "28-03-21 09:00:09 PM"
                },
                {
                    "rideID": 4,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest4",
                    "driverName": "driverTest4",
                    "driverVehicle": "motorbike",
                    "created": "28-03-21 09:00:09 PM"
                },
                {
                    "rideID": 5,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest5",
                    "driverName": "driverTest5",
                    "driverVehicle": "motorbike",
                    "created": "28-03-21 09:00:09 PM"
                },
                {
                    "rideID": 6,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest6",
                    "driverName": "driverTest6",
                    "driverVehicle": "motorbike",
                    "created": "28-03-21 09:00:09 PM"
                }], done);
        });
    });

    describe('GET /rides/paginate/0/2', () => {
        it('should return firs 2 records with page number is 0 and page size is 2', (done) => {
            request(app)
            .get('/rides/paginate/0/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [
                {
                    "rideID": 1,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest1",
                    "driverName": "driverTest1",
                    "driverVehicle": "motorbike",
                    "created": "28-03-21 09:00:09 PM"
                },
                {
                    "rideID": 2,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest2",
                    "driverName": "driverTest2",
                    "driverVehicle": "motorbike",
                    "created": "28-03-21 09:00:09 PM"
                }
            ], done);
        });
    });

    describe('POST /rides', () => {
        it('should return rides', (done) => {
            request(app)
            .post('/rides')
            .send({
                "startLatitude": "90",
                "startLongitude": "180"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error message for wrong start latitude', (done) => {
            request(app)
            .post('/rides')
            .send({
                "driver_vehicle": "motorbike",
                "rider_name": "riderTest1",
                "driver_name": "driverTest1",
                "start_lat": 91,
                "end_lat": 0,
                "start_long": 0,
                "end_long": 0
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                "error_code": "VALIDATION_ERROR",
                "message": "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
            }, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error message for wrong end latitude', (done) => {
            request(app)
            .post('/rides')
            .send({
                "driver_vehicle": "motorbike",
                "rider_name": "riderTest1",
                "driver_name": "driverTest1",
                "start_lat": 0,
                "end_lat": 91,
                "start_long": 0,
                "end_long": 0
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                "error_code": "VALIDATION_ERROR",
                "message": "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
            }, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error message for wrong start longitude', (done) => {
            request(app)
            .post('/rides')
            .send({
                "driver_vehicle": "motorbike",
                "rider_name": "riderTest1",
                "driver_name": "driverTest1",
                "start_lat": 0,
                "end_lat": 0,
                "start_long": 181,
                "end_long": 0
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                "error_code": "VALIDATION_ERROR",
                "message": "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
            }, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error message for wrong end longitude', (done) => {
            request(app)
            .post('/rides')
            .send({
                "driver_vehicle": "motorbike",
                "rider_name": "riderTest1",
                "driver_name": "driverTest1",
                "start_lat": 0,
                "end_lat": 0,
                "start_long": 0,
                "end_long": 181
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                "error_code": "VALIDATION_ERROR",
                "message": "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
            }, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error', (done) => {
            request(app)
            .post('/rides')
            .send({})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                "error_code": "VALIDATION_ERROR",
                "message": "Rider name must be a non empty string"
            }, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error', (done) => {
            request(app)
            .post('/rides')
            .send({
                "driver_vehicle": "motorbike",
                "rider_name": "riderTest1",
                "driver_name": "driverTest1"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                "error_code": "SERVER_ERROR",
                "message": "Unknown error"
            }, done);
        });
    });

    describe('POST /rides', () => {
        //- should it be change to create new rider?
        it('should created new record with rider 7', (done) => {

            request(app)
            .post('/rides')
            .send({
                "driver_vehicle": "motorbike",
                "rider_name": "riderTest11",
                "driver_name": "driverTest11",
                "start_lat": 0,
                "end_lat": 0,
                "start_long": 0,
                "end_long": 0
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [
                {
                    "rideID": 11,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest11",
                    "driverName": "driverTest11",
                    "driverVehicle": "motorbike",
                    "created": new Date().toISOString().slice(0, 19).replace('T', ' ')
                }
            ], done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return error', (done) => {
            request(app)
            .get('/rides/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [
                {
                    "rideID": 1,
                    "startLat": 0,
                    "startLong": 0,
                    "endLat": 0,
                    "endLong": 0,
                    "riderName": "riderTest1",
                    "driverName": "driverTest1",
                    "driverVehicle": "motorbike",
                    "created": "28-03-21 09:00:09 PM"
                }
            ], done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return error', (done) => {
            request(app)
            .get('/rides/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });
    });

    //- test for services folder

    //- test for winston folder

});