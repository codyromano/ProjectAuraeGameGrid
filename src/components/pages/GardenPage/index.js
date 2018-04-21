import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  getGameObjectsInPosition
} from '../../../store/gameDataUtils';

import BasePage from '../BasePage';

import GameGrid from '../../../GameGrid';
import GrassTile from '../../../GrassTile';

import { routerRedirector } from '../../../routes';

import './GardenPage.css';
import { tileSelected } from 'aurae-actions';
import { CLASS_PLANT } from 'aurae-resource-classes';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_GARDEN } from '../../../config/tabsMenuConfig';

class GardenPage extends React.Component {
  constructor(props) {
    super(props);
    this.onGridTileSelected = this.onGridTileSelected.bind(this);
    this.redirector = routerRedirector(props.history);
  }
  onGridTileSelected(coords) {
    const resources = this.props.getGameObjectsInPosition(coords);

    if (resources.length) {
      // TODO: Open question - can resources be stacked? Does the manage
      // resource route need to support editing multiple resources?
      const mostRecentResource = resources.slice(-1)[0];
      this.redirector.manageResource(mostRecentResource);
    } else {
      // TODO: Remove context reference
      this.context.store.dispatch(
        tileSelected(coords)
      );
      this.redirector.placeTileResource();
    }
  }
  render() {
    return (
      <BasePage selectedTabId={TAB_ID_GARDEN}>
        <PageWidthContainer>
          <h1>{this.props.headerText}</h1>

          <GameGrid
            defaultTileInnerContent={GrassTile}
            onGridTileSelected={this.onGridTileSelected}
            tileSize={5}
            width={3}
            height={4}
          />
        </PageWidthContainer>
      </BasePage>
    );
  }
}

GardenPage.propTypes = {
  history: PropTypes.object.isRequired,
  tileInnerContentMap: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  )
};

GardenPage.contextTypes = {
  // TODO: Specify object
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { tileInnerContentMap } = state.currentTile;

  let hasPlants = false;

  if (state.resources.byClass[CLASS_PLANT]) {
    hasPlants = Object.keys(state.resources.byClass[CLASS_PLANT]).length > 0;
  }

  return {
    getGameObjectsInPosition: getGameObjectsInPosition.bind(null, state),
    headerText: hasPlants ?
      'Select a plant to make it grow' : 'Tap a tile to plant something',
    tileInnerContentMap: tileInnerContentMap
  };
};
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GardenPage)
);
