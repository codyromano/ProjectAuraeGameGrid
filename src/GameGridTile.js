import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader} from 'material-ui/Card';
import { serializeGameObjectLocation } from './store/gameDataUtils';
import GrassTile from './GrassTile';
import './GameGridTile.css';

function coordsMatch(pairA, pairB) {
  return pairA.join('') === pairB.join('');
}

function gameGridComponentFactory(childComponentInfo) {
  return (props) => (
    <div>{childComponentInfo.title}</div>
  );
}

// Just the view for a tile
const GameGridTile = ({
  selectedCoords,
  coords,
  onGridTileSelected,
  innerComponents,
  InnerContent,
  BaseContent,
  tileSize
}) => {
  const classList = ['grid-tile'];
  const selected = coordsMatch(
    selectedCoords,
    coords
  );

  if (selected) {
    classList.push('grid-tile-selected');
  }

  return (
    <Card raised={"true"}>
      <div
        style={{ height: tileSize, width: tileSize }}
        className={classList.join(' ')}
        onClick={(event) => onGridTileSelected(coords)}
      >
        {innerComponents.map((InnerComponent, i) => (
          <InnerComponent key={i}/>
        ))}
      </div>
    </Card>
  );
};

GameGridTile.defaultProps = {
  selectedCoords: [-1, -1],
  BaseContent: GrassTile
};

GameGridTile.propTypes = {
  selectedCoords: PropTypes.arrayOf(
    PropTypes.number
  ),

  onGridTileSelected: PropTypes.func.isRequired,
  coords: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,

  innerComponents: PropTypes.arrayOf(
    PropTypes.func
  ).isRequired
};

const mapStateToProps = (state, ownProps) => {
  const locationKey = serializeGameObjectLocation(ownProps.coords);
  const innerContentIds = state.resources.byPosition[locationKey] || [];
  const innerComponents = innerContentIds
    .map(id => gameGridComponentFactory(state.resources.byId[id]));

  return {
    innerComponents,
    selectedCoords: state.currentTile.coords
  };
};

export default connect(mapStateToProps)(GameGridTile);
