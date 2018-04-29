import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameGridTile from './GameGridTile';
import './GameGrid.css';
import { serializeGameObjectLocation } from './store/gameDataUtils';
import Grid from 'material-ui/Grid';

class GameGrid extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onGridTileSelected: PropTypes.func.isRequired,
    defaultTileInnerContent: PropTypes.func,
    tileSize: PropTypes.number,
    tileInnerContentMap: PropTypes.objectOf(
      PropTypes.func
    )
  };

  static defaultProps = {
    defaultTileInnerContent: () => (<div></div>),
    onGridTileSelected: () => {},
    tileInnerContentMap: {},
    tileSize: 5
  };

  constructor(props, context) {
    super(props, context);
    this.generateGridTiles = this.generateGridTiles.bind(this);
    this.cachedGridTiles = this.generateGridTiles(props);
  }

  propsDidChange(newProps) {
    const serialize = (props) => Object.keys(props).sort().join('');
    return serialize(newProps) !== serialize(this.props);
  }

  generateGridTiles(props) {
    const totalTiles = props.width * props.height;
    let x = 0;
    let y = 0;

    const tiles = [];

    for (let i = 0; i < totalTiles; i++) {
      const contentKey = serializeGameObjectLocation(x, y);
      const CustomComponent = props.tileInnerContentMap[contentKey];

      const tileProps = {
        InnerContent: CustomComponent || props.defaultTileInnerContent,
        tileSize: `${props.tileSize}rem`,
        coords: [x, y]
      };

      tiles.push((
        <GameGridTile
          {...tileProps}
          key={contentKey}
          onGridTileSelected={props.onGridTileSelected}
        />
      ));
      x+= 1;

      // Reset column count at row end and increment row count
      if (x === props.width) {
        x = 0;
        y += 1;
      }
    }
    return tiles;
  }

  render() {
    return (
      <Grid container className="game-grid">
        {this.cachedGridTiles}
      </Grid>
    );
  }
}

GameGrid.contextTypes = {
  // TODO: Don't statically reference the store
  // TODO: Define shape specifically
  store: PropTypes.object.isRequired
};

export default connect()(GameGrid);
