import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { plantResourceAcquired } from 'aurae-store/actions';
import routePaths from 'aurae-config/routePaths';
import { withRouter } from 'react-router';

import { PageWidthContainer } from '../../layout';
import Button from 'material-ui/Button';
import Card, { CardContent, CardActions, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { SoundEffect } from 'aurae-components/data-providers/WrappedWithSound';

class PlaceTileResource extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect(resource) {
    this.props.plantResourceAcquired(resource, this.props.selectedCoords);
    this.props.history.push(routePaths.VIEW_GARDEN);
  }
  render = () => (
      <PageWidthContainer>
        <h1>Plant an item</h1>

          {this.props.gameItems.map(item => {
            const cardHeaderProps = {
              avatar: <Avatar src={item.imageSrc} />,
              title: <span>{item.title}</span>,
              subheader: <span>{item.itemClassDescription}</span>
            };
            const cardContentProps = {
              // TODO: Inline style is a hack
              component: () => <div style={{padding: '0 1.5rem'}}>
                <p style={{paddingTop: 0}}>{item.fullDescription}</p>
              </div>
            };

            const cardStyles = {
              margin: '1rem 0'
            };

            return (
              <Card key={item.title} style={cardStyles}>
                <CardHeader {...cardHeaderProps} />
                <CardContent {...cardContentProps} />
                <CardActions style={{
                  paddingLeft: '1.5rem',
                  paddingBottom: '1rem',
                  alignItems: 'right'
                }}>
                  <SoundEffect audioUrl="https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/sound-effects/sound-effect-branch-snap.mp3">
                    <Button
                      variant="raised"
                      onClick={() => this.onSelect(item)}
                      color="primary">Choose plant</Button>
                  </SoundEffect>
                </CardActions>
              </Card>
            );
          })}
      </PageWidthContainer>
    );
}

const itemShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired
}).isRequired;

PlaceTileResource.propTypes = {
  gameItems: PropTypes.arrayOf(itemShape),
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
  selectedCoords: state.currentTile.coords,
  gameItems: state.gameItems.filter(item => item.stats.level === 1)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  plantResourceAcquired
}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaceTileResource)
);
