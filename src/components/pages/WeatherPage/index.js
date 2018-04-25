import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import BasePage from '../BasePage';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_WEATHER } from '../../../config/tabsMenuConfig';
import { FETCH_FAIL } from 'aurae-reducers/weatherReducer';
import WeatherCardActive from './WeatherCardActive';
import WeatherCardInactive from './WeatherCardInactive';

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
            {this.props.weather.map(card => {
              const Component = card.intensity > 0 ? WeatherCardActive :
                WeatherCardInactive;
              return <Component key={card.id} card={card} />;
            })}
          </PageWidthContainer>
      </BasePage>
    );
  }
}

WeatherPage.propTypes = {
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

const mapDispatchToProps = () => ({});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
);
