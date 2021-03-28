'use strict';

module.exports = (db) => {
    const createRideTableSchema = `
        CREATE TABLE Rides
        (
        rideID INTEGER PRIMARY KEY AUTOINCREMENT,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )
    `;

    const deleteIfExistRideTable = `
        DELETE FROM Rides
        WHERE EXISTS
        (SELECT rideID
        FROM Rides
        WHERE rideID = 1);    
    `;

    const deleteAllRecords = `
        DELETE FROM Rides
    `;

    //- insert new record
    const insertRide1TableSchema = `
        INSERT INTO Rides
        (
            rideID,
            startLat,
            startLong,
            endLat,
            endLong,
            riderName,
            driverName,
            driverVehicle,
            created
        ) VALUES (
            1,
            0,
            0,
            0,
            0,
            'riderTest1',
            'driverTest1',
            'motorbike',
            '28-03-21 09:00:09 PM'
        )
    `;

    const insertRide2TableSchema = `
        INSERT INTO Rides
        (
            rideID,
            startLat,
            startLong,
            endLat,
            endLong,
            riderName,
            driverName,
            driverVehicle,
            created
        ) VALUES (
            2,
            0,
            0,
            0,
            0,
            'riderTest2',
            'driverTest2',
            'motorbike',
            '28-03-21 09:00:09 PM'
        )
    `;

    const insertRide3TableSchema = `
        INSERT INTO Rides
        (
            rideID,
            startLat,
            startLong,
            endLat,
            endLong,
            riderName,
            driverName,
            driverVehicle,
            created
        ) VALUES (
            3,
            0,
            0,
            0,
            0,
            'riderTest3',
            'driverTest3',
            'motorbike',
            '28-03-21 09:00:09 PM'
        )
    `;

    const insertRide4TableSchema = `
        INSERT INTO Rides
        (
            rideID,
            startLat,
            startLong,
            endLat,
            endLong,
            riderName,
            driverName,
            driverVehicle,
            created
        ) VALUES (
            4,
            0,
            0,
            0,
            0,
            'riderTest4',
            'driverTest4',
            'motorbike',
            '28-03-21 09:00:09 PM'
        )
    `;

    const insertRide5TableSchema = `
        INSERT INTO Rides
        (
            rideID,
            startLat,
            startLong,
            endLat,
            endLong,
            riderName,
            driverName,
            driverVehicle,
            created
        ) VALUES (
            5,
            0,
            0,
            0,
            0,
            'riderTest5',
            'driverTest5',
            'motorbike',
            '28-03-21 09:00:09 PM'
        )
    `;

    const insertRide6TableSchema = `
        INSERT INTO Rides
        (
            rideID,
            startLat,
            startLong,
            endLat,
            endLong,
            riderName,
            driverName,
            driverVehicle,
            created
        ) VALUES (
            6,
            0,
            0,
            0,
            0,
            'riderTest6',
            'driverTest6',
            'motorbike',
            '28-03-21 09:00:09 PM'
        )
    `;

    db.run(createRideTableSchema);
    db.run(deleteAllRecords);
    db.run(deleteIfExistRideTable);
    //- insert 6 rider to test pagination
    db.run(insertRide1TableSchema);
    db.run(insertRide2TableSchema);
    db.run(insertRide3TableSchema);
    db.run(insertRide4TableSchema);
    db.run(insertRide5TableSchema);
    db.run(insertRide6TableSchema);

    return db;
};
