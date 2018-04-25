import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Card, { CardContent, CardHeader } from 'material-ui/Card';

const WeatherCardInactive = ({ card }) => {
  return (<Card key={card.inactiveTitle}>
    <CardHeader
      title={card.inactiveTitle}
      avatar={<Avatar src={card.imageSrc} />}
    />
    <CardContent>
    {card.inactiveDescription}
    </CardContent>
  </Card>);
};

WeatherCardInactive.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    intensity: PropTypes.number.isRequired,
    noun: PropTypes.string.isRequired,
  }).isRequired
};

export default WeatherCardInactive;
