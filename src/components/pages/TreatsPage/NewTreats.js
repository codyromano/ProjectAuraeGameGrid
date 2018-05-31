import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { treatShape } from 'aurae-components/commonShapes';
import Gift3DContainer from 'aurae-components/animation/Gift3DContainer';

const NewTreats = ({ treats }) => (
  <Grid container>
    <Grid item xs={12}>
      <h2>New treat!</h2>
    </Grid>
    {treats.slice(0,1).map(treat => (
      <Grid item key={treat.id}>
        <Gift3DContainer treat={treat} />
      </Grid>
    ))}
  </Grid>
);

NewTreats.propTypes = {
  treats: PropTypes.arrayOf(treatShape).isRequired
};

export default NewTreats;
