import React from 'react';

const PlayButton = () => {

  const handleClick = () => {
    console.log('play');
  };

  return  <button onClick={handleClick}>Play</button>
}

export default PlayButton;