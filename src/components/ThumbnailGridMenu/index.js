import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ThumbnailGridMenu.css';
import { GridList, GridTile } from 'material-ui/GridList';

const ThumbnailGridMenu = ({
  items,
  onSelect
}) => (
  <GridList>
    {items.map(item => (
      <GridTile
        onClick={() => onSelect(item)}
        key={item.title}
        title={item.title}
      >
          <img src={item.imageSrc} alt={item.title} />
      </GridTile>
    ))}
  </GridList>
);

const itemShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired
}).isRequired;

ThumbnailGridMenu.propTypes = {
  onSelect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(itemShape)
};

const mapStateToProps = (state) => ({
  items: state.gameItems
});

export default connect(mapStateToProps)(ThumbnailGridMenu);
