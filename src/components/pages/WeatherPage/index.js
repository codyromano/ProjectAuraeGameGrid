import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import ReduxFetch from '../../data-providers/ReduxFetch';

import Paper from 'material-ui/Paper';
import Card, { CardMedia, CardHeader } from 'material-ui/Card';
import GridList, { GridTile } from 'material-ui/GridList';

import BasePage from '../BasePage';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_WEATHER } from '../../../config/tabsMenuConfig';

import { weatherDataFetched } from '../../../store/actions';

// TODO: Move to network settings in /config
const endpoint = 'http://localhost:8000/weather/seattle';

class WeatherPage extends React.Component {
  render() {
    return (
      <ReduxFetch endpoint={endpoint} actionCreator={weatherDataFetched}>
        <BasePage selectedTabId={TAB_ID_WEATHER}>
          <PageWidthContainer>
            <h1>Description: {this.props.description}</h1>
            <h2>Rain volume: {this.props.rainVolume} (past 3 hours)</h2>

    
            <Paper>
              <GridList>
                {this.props.weather.map(card => (
                  <GridTile key={card.title}>
                    <Card initiallyExpanded={true}>
                      <CardHeader title={card.title} />
                      <CardMedia>
                        <img alt={card.title} src={card.imageSrc} />
                      </CardMedia>
                    </Card>
                  </GridTile>
                ))}
              </GridList>
            </Paper>
          </PageWidthContainer>
        </BasePage>
      </ReduxFetch>
    );
  }
}

WeatherPage.propTypes = {
  rainVolume: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  weather: state.weather.allIds.map(id => state.weather.byId[id]),
  rainVolume: state.weather.byId['rain'].volumeLastThreeHours,
  description: state.weather.summary.description
});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
);
