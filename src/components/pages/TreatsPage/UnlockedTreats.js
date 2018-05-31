import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { treatShape } from 'aurae-components/commonShapes';

const UnlockedTreats = ({ treats }) => (
  <Grid container>
    {treats.map(treat => (
      <Grid item xs={12}>
        <strong>{treat.title}</strong>
      </Grid>
    ))}
  </Grid>
);

UnlockedTreats.propTypes = {
  treats: PropTypes.arrayOf(treatShape).isRequired
};

export default UnlockedTreats;
