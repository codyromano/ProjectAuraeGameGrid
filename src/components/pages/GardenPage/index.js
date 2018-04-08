import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import BasePage from '../BasePage';

import GameGrid from '../../../GameGrid';
import GrassTile from '../../../GrassTile';

import { routerRedirector } from '../../../routes';

import './GardenPage.css';
import { tileSelected } from '../../../store/actions';
import { PageWidthContainer } from '../../layout';

const createTileResourceComponent = ({ imageSrc }) => (props) => (
  <div>
    <img
      alt="Tile resource"
      style={{maxWidth: '100%'}}
      src={imageSrc} />
  </div>
);

// TODO: Move to helper function
function mapPlainObject(object, mapFn) {
  const newObject = {...object};

  for (const [key, value] of Object.entries(object)) {
    newObject[key] = mapFn(value);
  }
  return newObject;
}

class GardenPage extends React.Component {
  constructor(props) {
    super(props);
    this.onGridTileSelected = this.onGridTileSelected.bind(this);
    this.redirector = routerRedirector(props.history);
  }
  onGridTileSelected(coords) {
    // TODO: Remove context reference
    this.context.store.dispatch(
      tileSelected(coords)
    );
    this.redirector.placeTileResource();
  }
  render() {
    const tileInnerContentMap = mapPlainObject(
      this.props.tileInnerContentMap,
      createTileResourceComponent
    );

    return (
      <BasePage>
        <PageWidthContainer>
          <h1>Select an empty tile to plant something</h1>
          <GameGrid
            defaultTileInnerContent={GrassTile}
            onGridTileSelected={this.onGridTileSelected}
            tileInnerContentMap={tileInnerContentMap}
            tileSize={5}
            width={6}
            height={6}
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
  return {
    tileInnerContentMap: state.currentTile.tileInnerContentMap
  };
};
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GardenPage)
);
