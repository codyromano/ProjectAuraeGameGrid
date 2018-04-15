import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Card, { CardMedia, CardHeader } from 'material-ui/Card';
import GridList, { GridTile } from 'material-ui/GridList';

import BasePage from '../BasePage';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_WEATHER } from '../../../config/tabsMenuConfig';
import { FETCH_FAIL } from '../../../store/reducers/weatherReducer';

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
            <h1>{this.props.description}</h1>

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
    );
  }
}

WeatherPage.propTypes = {
  rainVolume: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { networkRequestLog } = state.weather.summary;
  const latestApiFetch = networkRequestLog.slice(-1)[0];

  return {
    fetchProblem: latestApiFetch.status === FETCH_FAIL,
    weather: state.weather.allIds.map(id => state.weather.byId[id]),
    rainVolume: state.weather.byId['rain'].volumeLastThreeHours,
    description: state.weather.summary.description
  }
};
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
);
