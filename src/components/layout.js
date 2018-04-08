import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const PageWidthContainer = ({ children }) => (
  <div style={{ maxWidth: '30rem', margin: '0 auto' }}>
    {children}
  </div>
);

PageWidthContainer.propTypes = {
  children: PropTypes.node.isRequired
};

// Export material UI provider with standard configuration
// for use in App as well as tests, which require it for React context
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

export const MaterialUIProvider = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {children}
  </MuiThemeProvider>
);
