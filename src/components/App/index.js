import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Material UI
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GameGrid from '../../GameGrid';
import GrassTile from '../../GrassTile';
import { routerRedirector } from '../../routes';
import './App.css';
import { tileSelected } from '../../store/actions';

import { PageWidthContainer } from '../layout';

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

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

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
      <MuiThemeProvider muiTheme={muiTheme}>
        <PageWidthContainer>
          <div>
            <h1>Select an empty tile to plant something</h1>
            <GameGrid
              defaultTileInnerContent={GrassTile}
              onGridTileSelected={this.onGridTileSelected}
              tileInnerContentMap={tileInnerContentMap}
              tileSize={5}
              width={6}
              height={6}
            />
          </div>
        </PageWidthContainer>
      </MuiThemeProvider>
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
