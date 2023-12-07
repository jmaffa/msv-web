// server.js
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';

const express = require('express');
const server = express();

const brainWaveData = ['test']
// server.get('/api/getbrain', (req, res) => {
//   res.json({ message: 'Hello from the Express server!' });
// });

// what is the allow origin of the arduino tho.....
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
}
});

server.get('/api/getbrain', (req, res) => {
    const responseData = {
        data: brainWaveData[brainWaveData.length - 1]

    }
    res.json(responseData)
})

server.post('/api/postbrain', (req, res) => {
    const receivedData = req.body;

    const responseData = {
        data: receivedData.data
    }
    // console.log(responseData.data)
    brainWaveData.push(responseData.data)
    res.json(responseData);
})
module.exports = server;


// const app = express();
// const port = 8000;

// app.use(cors());
// app.use(bodyParser.json());

// const brainWaveData = ['test']
// app.post('/test', (req, res) => {
//     const d = new Date();
//     let time = d.getTime();
//     const data = req.body;
//   // Your logic to handle the POST request and send a response
//     const responseData = {
//         message: "Hello, World!",
//     // Add more data as needed
//     };

//   res.json(responseData);
// //   console.log('posted')
// });

// app.post('/brain', (req, res) => {
//     const receivedData = req.body;
    
//     const responseData = {
//         data: receivedData.data
//     }
//     // console.log(responseData.data)
//     brainWaveData.push(responseData.data)
//     res.json(responseData);
// })

// app.get('/getBrain', (req, res) => {
//     const responseData = {
//         data: brainWaveData[brainWaveData.length - 1]

//     }
//     res.json(responseData)
// })

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
