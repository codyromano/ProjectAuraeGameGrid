import React from 'react';

const GrassTile = () => {
  // TODO: Move to stylesheet
  const inlineStyles = {
    backgroundImage: 'url(https://cdn3.f-cdn.com/contestentries/44321/7430869/526e2123b37c4_thumb.jpg)',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px'
  };

  return (
    <div style={inlineStyles} />
  );
};

export default GrassTile;
