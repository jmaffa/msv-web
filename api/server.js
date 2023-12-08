// server.js
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';

const express = require('express');
// const firebase = require('../firebase/firebase');
const admin = require('firebase-admin');
var serviceAccount = require("../firebase/msv-webapp-firebase-adminsdk-4itu3-cc4bb1bb8c.json");
''
// const serviceAccount = require('./path/to/your/serviceAccountKey.json'); // Replace with your own service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://msv-webapp.firebaseio.com', // Replace with your Firebase project URL
  projectId: 'msv-webapp'
});



const server = express();
// const db = firebase.firestore();
const brainWaveData = []
// const port = 8000; // REMOVE WHEN DEPLOYED

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
// server.get('/api/getbrain', (req, res) => {
//     // res.json({ message: 'Data from the server' });
//     const responseData = {
//         data: brainWaveData[brainWaveData.length - 1]
//     }
//     res.json(responseData)
// })
// NEED TO GO BUT FILL THIS IN AGAIN
// server.post('/api/postbrain', (req, res) => {
//     // const requestData = req.body; // Assuming JSON payload
//     // Process the incoming data
//     // For example, you can log the data and send a response
//     // console.log('Received data:', requestData);
//     // res.json({ data: 'b: 0,52,51,284017,128944,41894,28099,10124,23677,1752,1289' });
//     const receivedData = req.body;
//     // console.log(receivedData)
//     const responseData = {
//         data: receivedData.data
//     }
//     // console.log(responseData.data) // Works up to here
//     // brainWaveData.push('something')
//     brainWaveData.push(responseData.data)
//     console.log(brainWaveData)
//     // console.log(brainWaveData[brainWaveData.length - 1])
//     res.json(responseData);
// })

server.get('/api/getbrain', async (req, res) => {
    try {
      const firestore = admin.firestore();
      const collectionRef = firestore.collection('brainWaveReads'); // Replace with your Firestore collection name
  
      // Query Firestore to get the most recent entry
      const snapshot = await collectionRef.orderBy('timestamp', 'desc').limit(1).get();
  
      if (snapshot.empty) {
        res.json({ error: 'No entries found' });
        return;
      }
  
      // Extract data from the most recent entry
      const mostRecentEntry = snapshot.docs[0].data();
  
      res.json(mostRecentEntry);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
// server.post('/api/postbrain', async (req, res) => {
//     try {
//       const receivedData = req.body;
//       const responseData = {
//         data: receivedData.data,
//       };
  
//       // Push data to Firestore
//       const firestore = admin.firestore();
//       const collectionRef = firestore.collection('brainWaveReads'); // Replace with your Firestore collection name
  
//       await collectionRef.add({
//         data: responseData.data,
//         timestamp: admin.firestore.FieldValue.serverTimestamp(),
//       });
  
//       res.json(responseData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
server.post('/api/postbrain', async (req, res) => {
    try {
      const receivedData = req.body;
      const responseData = {
        data: receivedData.data,
      };
  
      const firestore = admin.firestore();
      const collectionRef = firestore.collection('brainWaveReads'); // Replace with your Firestore collection name
  
      // Push data to Firestore
      await collectionRef.add({
        data: responseData.data,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
  
      // Cleanup: Remove older entries if the collection exceeds a certain limit (e.g., keep the latest 50 entries)
      const MAX_ENTRIES = 50;
      const snapshot = await collectionRef.orderBy('timestamp', 'desc').offset(MAX_ENTRIES).get();
  
      const batch = firestore.batch();
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
  
      res.json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
// Example using Firestore in a route

 // Path to your firebase.js file



// Define a route that interacts with Firestore
// server.get('/getTest', async (req, res) => {
//   try {
//     const data = [];
//     const snapshot = await db.collection('your_collection').get();

//     snapshot.forEach((doc) => {
//       data.push(doc.data());
//     });

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// REMOVE CHUNK WHEN DEPLOYED UP TO MODULE EXPORTS
// server.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });




module.exports = server;

