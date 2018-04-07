import React from 'react';

export const PageWidthContainer = ({ children }) => (
  <div style={{ maxWidth: '30rem', margin: '0 auto' }}>
    {children}
  </div>
);
