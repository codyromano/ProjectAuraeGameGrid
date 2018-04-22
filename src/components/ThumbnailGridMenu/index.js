import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ThumbnailGridMenu.css';
import GridList, { GridListTile } from 'material-ui/GridList';
import { SoundEffect } from 'aurae-components/data-providers/WrappedWithSound';

const ThumbnailGridMenu = ({
  items,
  onSelect
}) => (
  <GridList>
    {items.map(item => (
      <GridListTile
        style={{ cursor: 'pointer' }}
        onClick={() => onSelect(item)}
        key={item.title}
        title={item.title}
      >
        <SoundEffect audioUrl="https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/sound-effects/sound-effect-branch-snap.mp3">
          <img src={item.imageSrc} alt={item.title} />
        </SoundEffect>
      </GridListTile>
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
