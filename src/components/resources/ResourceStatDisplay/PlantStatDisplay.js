import React from 'react';
import { resourceShape } from 'aurae-components/commonShapes';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

const PlantStatDisplay = ({ resource }) => {
  return (<Grid container spacing={8} alignContent="center" alignItems="center">
    <Grid item xs={1}>
      <div>Lvl {resource.stats.level}</div>
    </Grid>
    <Grid item xs={10}>
      <LinearProgress
        variant="determinate"
        min={0}
        value={resource.stats.waterLevel || 0}
        max={100}
      />
    </Grid>
    <Grid item xs={1}>
      <div>Lvl {resource.stats.level + 1}</div>
    </Grid>
  </Grid>);
};

PlantStatDisplay.propTypes = {
  resource: resourceShape
};

export default PlantStatDisplay;
