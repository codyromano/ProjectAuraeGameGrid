import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import BasePage from '../BasePage';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_WEATHER } from '../../../config/tabsMenuConfig';

class WeatherPage extends React.Component {
  render() {
    return (
      <BasePage selectedTabId={TAB_ID_WEATHER}>
        <PageWidthContainer>
          <div>Weather</div>
        </PageWidthContainer>
      </BasePage>
    );
  }
}

WeatherPage.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
);
