import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import { serializeGameObjectLocation } from './store/gameDataUtils';
import GrassTile from './GrassTile';
import './GameGridTile.css';

function coordsMatch(pairA, pairB) {
  return pairA.join('') === pairB.join('');
}

function gameGridComponentFactory(childComponentInfo) {
  const inlineStyle = { maxWidth: '100%' };

  // TODO: Source water dynamically from IRL weather events
  const WATER_PROGRESS_VALUE = 0;

  return (props) => (
    <div>
      <LinearProgress
        thickness={10}
        max={100}
        min={0}
        value={childComponentInfo.waterLevel}
        mode={'determinate'}
      />
      <img
        alt={`Game resource`}
        style={inlineStyle}
        src={childComponentInfo.imageSrc} />
    </div>
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
