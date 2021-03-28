'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {logger} = require('./services/winston');

module.exports = (db) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, (req, res) => {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            logger.log({
                level: 'error',
                message: {
                    error_code: 'VALIDATION_ERROR',
                    message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                }
            });

            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            logger.log({
                level: 'error',
                message: {
                    error_code: 'VALIDATION_ERROR',
                    message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                }
            });
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            logger.log({
                level: 'error',
                message: {
                    error_code: 'VALIDATION_ERROR',
                    message: 'Rider name must be a non empty string'
                }
            });
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            logger.log({
                level: 'error',
                message: {
                    error_code: 'VALIDATION_ERROR',
                    message: 'Rider name must be a non empty string'
                }
            });
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            logger.log({
                level: 'error',
                message: {
                    error_code: 'VALIDATION_ERROR',
                    message: 'Rider name must be a non empty string'
                }
            });
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        var values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];
        const result = db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                if (err) {
                    return res.send({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }

                res.send(rows);
            });
        });

    });

    /**
     * @description
     * Basic document
     * @name Pagination rides
     * URL: /rides/paginate
     * Params: 
     * @param pageNumber
     * @requires false
     * 
     * @param pageSize
     * @requires false
     * 
     * @summary 
     * This function basically enable the ability of paginate the rides list
     * Logic here
     * offset = pageNumber * pageSize
     * limit = pageSize
     * 
     * @throws
     * if pageNumber || pageSize was not provided,
     * then the function will be considered to return all rides
     * 
     * @author baots
     */
    app.get('/rides/paginate/:pageNumber?/:pageSize?', (req, res) => {
        let query = `SELECT * FROM Rides`;

        if(req.params.pageNumber || req.params.pageSize) {
            const pageNumber = Number(req.params.pageNumber);
            const pageSize = Number(req.params.pageSize);

            let offset = pageNumber * pageSize;
            let limit = pageSize;
            query += ` LIMIT ${limit} OFFSET ${offset}`;
            console.log('====================================');
            console.log('offset', offset);
            console.log('limit', limit);
            console.log('====================================');
        }
        db.all(query, function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error' + err
                });
            }

            if (rows.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides' + rows
                });
            }

            res.send(rows);
        });
    });

    app.get('/rides/:id', (req, res) => {
        db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            if (rows.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }

            res.send(rows);
        });
    });

    return app;
};
