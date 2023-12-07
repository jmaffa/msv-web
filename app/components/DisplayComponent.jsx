import React, { useState } from 'react';

const DisplayComponent = ({ responseData }) => {
  // Your logic to display different content based on responseData
  const [emotion, setEmotion] = useState('No Emotion Detected');

  const handleEmotionChange = () => {
    let newEmotionCode = handleResponseData();
    // let output = '';
    switch (newEmotionCode) {
      case 'a':
        setEmotion('Attention Detected');
      case 'b':
        setEmotion('Meditation Detected');
      case 'c':
        setEmotion('Dreamless Sleep Detected (maybe not lol)');
      case 'x':
        setEmotion('Error: No data received');
      case 'y':
        setEmotion('Error: Arduino is not connected');
      case 'z':
        setEmotion('Error: Invalid data received');
      default:
        setEmotion('ERROR: NO EMOTION DETECTED');
  }
}

  // TODO: logic to turn data into the corresponding predominant emotion
  const handleResponseData = () => {
    // console.log('in here')
    let raw = responseData.data;
    if (raw == undefined){
      // return 'x'
      return <h1 style={{color: 'orange'}}>Error: No data received</h1>;
      return 'Error: No data received';
    }
    if (raw == 'err1'){
      // return 'y'
      return <h1 style={{color: 'orange'}}>Error: Arduino is not connected</h1>;
      return 'Error: Arduino is not connected';
    }
    if (raw.slice(0, 2) != 'b:'){
      // return 'z'
      return <h1 style={{color: 'orange'}}>Error: Invalid data received</h1>;
      return 'Error: Invalid data received';
    }
    else{
      // should be in this format 'b: 0,40,51,284017,128944,41894,28099,10124,23677,1752,1289'

      // remove b
      let vals = raw.slice(2, raw.length);
      let split_vals = vals.split(',');
      
      // split_vals = ['0', '40', '51', '284017', '128944', '41894', '28099', '10124', '23677', '1752', '1289']

      let connection = split_vals[0].trim();
      let first = split_vals[1] / 100 ;
      let second = split_vals[2] / 100;
      let third = split_vals[3] / 2000000; 

      if (first > second && first > third){
        return <h1 style={{color: 'red'}}>Attention Detected</h1>;
      }
      else if (second > first && second > third){
        // return 'b'
        // return 'Meditation Detected';
        return <h1 style={{color: 'darkgoldenrod'}}>Meditation Detected</h1>;
      }
      else if (third > first && third > second){
        // return 'c'
        // return '';
        return <h1 style={{color: 'blue'}}>Dreamless Sleep Detected</h1>;
      }
      else{
        // return 'd'
        return <h1 style={{color: 'orange'}}>Error: No emotion detected</h1>;
        return 'ERROR: NO EMOTION DETECTED';
      }

    }
  }
  return (
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

      {handleResponseData()}
      {/* <h1>{handleResponseData()}</h1> */}
      {/* <h1>{emotion}</h1> */}
      {/* <h1>{responseData.data}</h1> */}
      {/* Add more content based on your requirements */}
    </div>
  );
};

export default DisplayComponent;