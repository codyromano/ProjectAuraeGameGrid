import React from 'react';
import PropTypes from 'prop-types';

export const PageWidthContainer = ({ children }) => (
  <div style={{ maxWidth: '30rem', margin: '0 auto' }}>
    {children}
  </div>
);

PageWidthContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.func),
    PropTypes.object
  ]).isRequired
};

