import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import { treatShape } from 'aurae-components/commonShapes';

const UnlockedTreats = ({ treats }) => (
  <Grid container>
    {treats.map(treat => (
      <Grid key={treat.id} item xs={12}>
        <Card>
          <CardHeader
            title={treat.title}
            avatar={<Avatar src={treat.imageSrc}/>}
          />
          <CardContent>
            {treat.description}
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

UnlockedTreats.propTypes = {
  treats: PropTypes.arrayOf(treatShape).isRequired
};

export default UnlockedTreats;
