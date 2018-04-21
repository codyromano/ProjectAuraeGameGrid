import React from 'react';
import { resourceShape } from 'aurae-common-shapes';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

const PlantStatDisplay = ({ resource }) => {
  return (<Grid container>
    <Grid item xs={12}>
      <h1>Details</h1>
    </Grid>
    <Grid item xs={4}>
      <strong>Water</strong>
    </Grid>
    <Grid item xs={8}>
      <LinearProgress
        variant="determinate"
        min={0}
        value={resource.stats.water || 0}
        max={100}
      />
    </Grid>
  </Grid>);
};

PlantStatDisplay.propTypes = {
  resource: resourceShape
};

export default PlantStatDisplay;
