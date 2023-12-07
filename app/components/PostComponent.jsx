// src/components/PostComponent.js
import React, { useState } from 'react';

const PostComponent = ({ updateResponse }) => {
  const sendData = async () => {
    try {
      const response = await fetch('http://localhost:8000/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });

      const data = await response.json();
      updateResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const mockAttention = 'b: 0,52,51,284017,128944,41894,28099,10124,23677,1752,1289'
  const mockMeditation = 'b: 0,40,51,284017,128944,41894,28099,10124,23677,1752,1289'
  const mockSleep = 'b: 0,3,2,2840170,128944,41894,28099,10124,23677,1752,1289'

  const mockList = [mockAttention, mockMeditation, mockSleep]
  // TODO FILL MOCK WITH req
  const sendBrain = async () => {
    // console.log((Math.floor(Math.random()*3)))
    // console.log(mockList[(Math.floor(Math.random()*3))])
    try{
      const response = await fetch('https://msv-web.vercel.app/api/postbrain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "data": mockList[(Math.floor(Math.random()*3))]}),
      });
      // console.log(response));
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getBrain = async () => {
    try {
      const response = await fetch('https://msv-web.vercel.app/api/getbrain', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }}).then(response => response.json())
        .then(data => {
          updateResponse(data);
          console.log(data)}
        );
    } catch (error){
      console.error('Error:', error)
    }
  }

  return (
    
    // <div>
    //   {/* {window.setInterval(sendData, 10000)} */}
    //   {/* <button onClick={sendData}>Send POST Request</button> */}
    //   <button onClick={sendBrain}>Send Brain Data mock</button>
    //   <button onClick={getBrain}>Get Brain Data</button>
    // </div>
    <div class="flex flex-col">
      <button onClick={sendBrain} class="bg-blue-500 text-white px-4 py-2 m-2">POST Brain Data</button>
      <button onClick={getBrain} class="bg-green-500 text-white px-4 py-2 m-2">GET Brain Data</button>
    </div>
  );
};

export default PostComponent;
