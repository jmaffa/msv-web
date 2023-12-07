// server.js
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';


const express = require('express');
const server = express();
let brainWaveData = ['test']

// Middleware to parse JSON bodies
server.use(express.json());

// what is the allow origin of the arduino tho.....
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();

//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//       } else {
//         next();
// }
});

// server.get('/api/getbrain', (req, res) => {
//     res.json({ message: 'Data from the server' });
//     // const responseData = {
//     //     data: brainWaveData[brainWaveData.length - 1]

//     // }
//     // res.json(responseData)
// })

server.post('/api/postbrain', (req, res) => {
    const requestData = req.body; // Assuming JSON payload
    // Process the incoming data
    // For example, you can log the data and send a response
    console.log('Received data:', requestData);
    res.json({ message: 'Data received and processed successfully' });
    // const receivedData = req.body;

    // const responseData = {
    //     data: receivedData.data
    // }
    // // console.log(responseData.data)
    // brainWaveData.push(responseData.data)
    // res.json(responseData);
})

// Import routes
// const getBrainRoute = require('./getbrain');
// const postBrainRoute = require('./postbrain');

// // Use routes
// server.use('/api', getBrainRoute);
// server.use('/api', postBrainRoute);

module.exports = server;




// const brainWaveData = ['test']
// // server.get('/api/getbrain', (req, res) => {
// //   res.json({ message: 'Hello from the Express server!' });
// // });



// server.get('/api/getbrain', (req, res) => {
//     const responseData = {
//         data: brainWaveData[brainWaveData.length - 1]

//     }
//     res.json(responseData)
// })

// server.post('/api/postbrain', (req, res) => {
//     const requestData = req.body; // Assuming JSON payload
//     // Process the incoming data
//     // For example, you can log the data and send a response
//     console.log('Received data:', requestData);
//     res.json({ message: 'Data received and processed successfully' });
//     // const receivedData = req.body;

//     // const responseData = {
//     //     data: receivedData.data
//     // }
//     // // console.log(responseData.data)
//     // brainWaveData.push(responseData.data)
//     // res.json(responseData);
// })
// module.exports = server;


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
