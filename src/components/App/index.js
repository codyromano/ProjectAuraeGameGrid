import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { TILE_SELECTED } from '../../store/actions';
import ThumbnailGridMenu from '../ThumbnailGridMenu';
import GameGrid from '../../GameGrid';
import GrassTile from '../../GrassTile';
import { routerRedirector } from '../../routes';
import './App.css';
import { tileSelected } from '../../store/actions';

const createTileResourceComponent = ({ imageSrc }) => (props) => (
  <div>
    <img style={{maxWidth: '100%'}} src={imageSrc} />
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


// TODO: Rename "App" to "ViewGarden"
class App extends React.Component {
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
      <main>
        <h1>Select an empty tile to plant something</h1>
        <GameGrid
          defaultTileInnerContent={GrassTile}
          onGridTileSelected={this.onGridTileSelected}
          tileInnerContentMap={tileInnerContentMap}
          tileSize={5}
          width={6}
          height={6}
        />
      </main>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  tileInnerContentMap: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  )
};

App.contextTypes = {
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
  connect(mapStateToProps, mapDispatchToProps)(App)
);
