'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Import Flights Test Data:

let flights = require('./test-data/flightSeating');

let { reservations } = require('./test-data/reservations');

// Import functions:

const { flightVerifier, getClient } = require('./public/seat-select/js/serverFunctions');

// User Interface Handlers:

const handleFlightAvailability = (req, res) => {
    let flightsAvailable = flights;
    let flightNos = Object.keys(flightsAvailable.flights);
    res.send(JSON.stringify(flightNos));
}

const handleFlightSelect = (req, res) => {
    const { flightNumber } = req.params;
    res.send(flightVerifier(flightNumber, flights));
    console.log(`flight ${flightNumber} seat info sent.`);
}

const handleUserInfo = (req, res) => {
    const { flight, seat, givenName, surname, email } = req.body;
    console.log(email);
    const id = 1001;
    reservations.push({
        flight: flight,
        seat: seat,
        name: givenName,
        surname: surname,
        email: `${email}`
    })
    res.send(JSON.stringify(id));
    console.log(reservations);
}

const handleReserationFinder = (req, res) => {
    const emailAddress = req.params.email;
    let you = reservations.find(client => client.email === emailAddress);
    res.send(JSON.stringify(you));
}

const PORT = process.env.PORT || 8000;

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('dev'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    
    // endpoints
    
    .get('/flight-availability', handleFlightAvailability)
    .get('/flight-select/:flightNumber', handleFlightSelect)
    .post('/user-info', handleUserInfo)
    .get('/find-my-reservation/:email', handleReserationFinder)

    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));