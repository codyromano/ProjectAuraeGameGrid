import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GrassTile from './GrassTile';
import './GameGridTile.css';

function coordsMatch(pairA, pairB) {
  return pairA.join('') === pairB.join('');
}

// Just the view for a tile
const GameGridTile = ({
  selectedCoords,
  coords,
  onGridTileSelected,
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
    <div
      style={{ height: tileSize, width: tileSize }}
      className={classList.join(' ')}
      onClick={(event) => onGridTileSelected(coords)}
    >
      <InnerContent coords={coords} />
    </div>  
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
  tileInnerContentMap: PropTypes.object.isRequired,
  onGridTileSelected: PropTypes.func.isRequired,
  coords: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired
  /*
  coords: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
  */
};

const mapStateToProps = (state) => {
  console.log(state.currentTile.tileInnerContentMap);

  return {
    selectedCoords: state.currentTile.coords,
    tileInnerContentMap: state.currentTile.tileInnerContentMap
  };
};

export default connect(mapStateToProps)(GameGridTile);
