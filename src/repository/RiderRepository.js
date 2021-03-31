'use strict'
const {logger} = require('../services/winston');
var globalDBInstance = null;
module.exports = {
    setDBInstance: function(db) {
        globalDBInstance = db;
    },
    rideById: function(id) {
        return new Promise((resolve, reject) => {
            globalDBInstance.all(`SELECT * FROM Rides WHERE rideID='${id}'`, async function (err, rows) {
                if (err) {
                    reject({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }
                if (rows.length === 0) {
                    reject({
                        error_code: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Could not find any rides'
                    });
                }
                resolve(rows);
    
            });
        });
    },
    ridePagination: function(pn = null, ps = null) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM Rides`;

            if(pn !== null || ps !== null) {
                const pageNumber = Number(pn);
                const pageSize = Number(ps);

                let offset = pageNumber * pageSize;
                let limit = pageSize;
                query += ` LIMIT ${limit} OFFSET ${offset}`;

                console.log('====================================');
                console.log('offset', offset);
                console.log('limit', limit);
                console.log('====================================');
            }
            globalDBInstance.all(query, function (err, rows) {
                if (err) {
                    reject({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error' + err
                    });
                }

                if (rows.length === 0) {
                    reject({
                        error_code: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Could not find any rides' + rows
                    });
                }
                resolve(rows);
            });
        });
    },
    showAllRides: function({
        start_lat, 
        start_long, 
        end_lat, 
        end_long, 
        rider_name, 
        driver_name, 
        driver_vehicle
    }) {
        const startLatitude = Number(start_lat);
        const startLongitude = Number(start_long);
        const endLatitude = Number(end_lat);
        const endLongitude = Number(end_long);
        const riderName = rider_name;
        const driverName = driver_name;
        const driverVehicle = driver_vehicle;
        return new Promise((resolve, reject) => {
            if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
                logger.log({
                    level: 'error',
                    message: {
                        error_code: 'VALIDATION_ERROR',
                        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                    }
                });
    
                reject({
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
                reject({
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
                reject({
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
                reject({
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
                reject({
                    error_code: 'VALIDATION_ERROR',
                    message: 'Rider name must be a non empty string'
                });
            }
    
            var values = [start_lat, start_long, end_lat, end_long, rider_name, driver_name, driver_vehicle];
            globalDBInstance.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
                if (err) {
                    reject({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }
                globalDBInstance.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                    if (err) {
                        reject({
                            error_code: 'SERVER_ERROR',
                            message: 'Unknown error'
                        });
                    }
                    resolve(rows);
                });
            });
        });
    }
}
