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

class WeatherPage extends React.Component {
  render() {
    return (
      <BasePage selectedTabId={TAB_ID_WEATHER}>
        <PageWidthContainer>
          <h1>It's wonderfully gray in Seattle.</h1>

  
          <Paper>
            <GridList>
              {this.props.weather.map(card => (
                <GridTile>
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
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  weather: state.weather.allIds.map(id => state.weather.byId[id])
});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
);
