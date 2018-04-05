import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { plantResourceAcquired } from '../../../store/actions';
import ThumbnailGridMenu from '../../ThumbnailGridMenu';
import { routePaths } from '../../../routes';
import { withRouter } from 'react-router';

class PlaceTileResource extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect(resource) {
    this.props.plantResourceAcquired(resource, this.props.selectedCoords);
    this.props.history.push(routePaths.VIEW_GARDEN);
  }
  render() {
    return (<div>
      <h1>Choose a plant</h1>
      <ThumbnailGridMenu
        onSelect={this.onSelect}
      />
    </div>);
  }
}

PlaceTileResource.propTypes = {
  selectedCoords: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,
  plantResourceAcquired: PropTypes.func.isRequired,
  // TODO: Move to common shapes file
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state) => ({
  selectedCoords: state.currentTile.coords
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  plantResourceAcquired
}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaceTileResource)
);
