import React from 'react';
import { resourceShape } from 'aurae-common-shapes';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

const PlantStatDisplay = ({ resource }) => {
  return (<Grid container alignItems="center">
    <Grid item xs={4}>
      <strong>Progress to Lvl {resource.stats.level + 1}</strong>
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
