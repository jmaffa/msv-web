// server.js
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';


const express = require('express');
const server = express();
const brainWaveData = []

server.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'https://msv-web-jmaffas-projects.vercel.app'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
// Middleware to parse JSON bodies
server.use(express.json());

// what is the allow origin of the arduino tho.....


//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//       } else {
//         next();
// }


// TODO: It's possible i can do this just with a get and just make the get request also send data to the server in its response
server.get('/api/getbrain', (req, res) => {
    // res.json({ message: 'Data from the server' });
    const responseData = {
        data: brainWaveData[brainWaveData.length - 1]
    }
    res.json(responseData)
})
// NEED TO GO BUT FILL THIS IN AGAIN
server.post('/api/postbrain', (req, res) => {
    // const requestData = req.body; // Assuming JSON payload
    // Process the incoming data
    // For example, you can log the data and send a response
    // console.log('Received data:', requestData);
    // res.json({ data: 'b: 0,52,51,284017,128944,41894,28099,10124,23677,1752,1289' });
    const receivedData = req.body;
    // console.log(receivedData)
    const responseData = {
        data: receivedData.data
    }
    console.log(responseData.data) // Works up to here
    // brainWaveData.push('something')
    brainWaveData.push(responseData.data)
    // console.log(brainWaveData[brainWaveData.length - 1])
    res.json(responseData);
})


module.exports = server;