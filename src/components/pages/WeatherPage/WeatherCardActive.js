import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import { currencyResourceAcquired } from 'aurae-store/actions';
import { SoundEffect } from 'aurae-components/data-providers/WrappedWithSound';

const WeatherCardActive = ({
  card,
  currencyResourceAcquired
}) => {
  return (<Card key={card.title}>
    <CardHeader
      title={card.title}
      subtitle={`${card.intensityDescriptor}`}
      avatar={<Avatar src={card.imageSrc} />}
    />

  <CardContent>
  {card.description}
  </CardContent>

  <CardActions>
    <SoundEffect audioUrl="https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/sound-effects/sound-effect-water-splash.mp3">
      <Button
        variant="raised"
        color="primary"
        onClick={() => currencyResourceAcquired(
          card.id,
          card.intensity
        )}
        label={`Collect ${card.intensityAdjective} ${card.noun}`}
        fullWidth={true}
      >
        Collect {card.intensityAdjective} {card.noun}
      </Button>
    </SoundEffect>
  </CardActions>
  </Card>);
};

WeatherCardActive.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    intensity: PropTypes.number.isRequired,
    noun: PropTypes.string.isRequired,
  }).isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  currencyResourceAcquired: (weatherType, addAmount) => dispatch(
    // TODO: Develop formula for mapping actual rainfall to currency amount
    currencyResourceAcquired(weatherType, 50)
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCardActive);
