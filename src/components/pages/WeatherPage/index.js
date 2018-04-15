import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Card, { CardActions, CardText, CardHeader } from 'material-ui/Card';

import BasePage from '../BasePage';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_WEATHER } from '../../../config/tabsMenuConfig';
import { FETCH_FAIL } from '../../../store/reducers/weatherReducer';
import { currencyResourceAcquired } from '../../../store/actions';

// TODO: Move to a more general modules file and improve design
const Warning = ({ children }) => (
  <div className="warning">
    {children}
  </div>
);

class WeatherPage extends React.Component {
  render() {
    return (
        <BasePage selectedTabId={TAB_ID_WEATHER}>
          {this.props.fetchProblem && (<Warning>
            We had trouble fetching the latest weather data. The information
            you see below might be a bit out of date.
          </Warning>)}

          <PageWidthContainer>
            {this.props.weather.map(card => (
              <Card key={card.title}>
                <CardHeader
                  title={card.title}
                  subtitle={`${card.intensityDescriptor}`}
                  avatar={card.imageSrc}
                />

              <CardText>
              {card.description}
              </CardText>

              <CardActions>
                <RaisedButton
                  onClick={() => this.props.currencyResourceAcquired(
                    card.id,
                    card.intensity
                  )}
                  primary={true}
                  label={`Collect ${card.noun} (${card.intensity}ml)`}
                  fullWidth={true}
                />
              </CardActions>
            </Card>
          ))}
          </PageWidthContainer>
      </BasePage>
    );
  }
}

WeatherPage.propTypes = {
  currencyResourceAcquired: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { networkRequestLog } = state.weather.summary;
  const latestApiFetch = networkRequestLog.slice(-1)[0];

  return {
    fetchProblem: latestApiFetch.status === FETCH_FAIL,
    weather: state.weather.allIds.map(id => state.weather.byId[id]),
    description: state.weather.summary.description
  }
};

const mapDispatchToProps = (dispatch) => ({
  currencyResourceAcquired: (weatherType, addAmount) => dispatch(
    currencyResourceAcquired(weatherType, addAmount)
  )
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
);
