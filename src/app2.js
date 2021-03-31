'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {rideById, ridePagination, showAllRides} = require('./repository/RiderRepository');

//- this is the way to use async/await. Besides, I can make it shorter
module.exports = (db) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, async (req, res) => {
        try {
            let rows = await showAllRides(req.body);
            res.send(rows);
        } catch (error) {
            res.send(error);
        }
    });

    /**
     * @description
     * Basic document
     * @name Pagination rides
     * URL: /rides/paginate
     * Params:
     * @param pageNumber
     * @requires false
     * @param pageSize
     * @requires false
     * @summary
     * This function basically enable the ability of paginate the rides list
     * Logic here
     * offset = pageNumber * pageSize
     * limit = pageSize
     * @throws
     * if pageNumber || pageSize was not provided,
     * then the function will be considered to return all rides
     * @author baots
     */
    app.get('/rides/paginate/:pageNumber?/:pageSize?', async (req, res) => {
        try {
            let rows = await ridePagination(req.params.pageNumber, req.params.pageSize);
            res.send(rows);
        } catch (error) {
            res.send(error);
        }
    });

    app.get('/rides/:id', async (req, res) => {
        try {
            let rows = await rideById(req.params.id);
            res.send(rows);
        } catch (error) {
            res.send(error);
        }
    })

    return app;
};
