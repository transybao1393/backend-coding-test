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
    const insertRideTableSchema = `
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

    db.run(createRideTableSchema);
    db.run(deleteAllRecords);
    db.run(deleteIfExistRideTable);
    db.run(insertRideTableSchema);

    return db;
};
