import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ThumbnailGridMenu.css';

const ThumbnailGridMenu = ({
  items,
  onSelect
}) => (
  <div className="thumbnail-grid-menu">
    {items.map(item => (
      <button key={item.title} className="thumbnail-grid-menu-button"
        onClick={() => onSelect(item)}>
        <img
          alt={item.title}
          className="thumbnail-grid-menu-image"
          src={item.imageSrc} />
        {item.title}
      </button>
    ))}
  </div>
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
