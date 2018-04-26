import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { routePaths } from 'aurae-routes';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';

import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';

import ResourceStatDisplay from 'aurae-components/resources/ResourceStatDisplay';
import BasePage from 'aurae-components/pages/BasePage';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_GARDEN } from 'aurae-config/tabsMenuConfig';
import {
  STAT_WATER_LEVEL,
  STAT_OPERATOR_ADD,
  STAT_OPERATOR_SUBTRACT,
  resourceStatChanged
} from 'aurae-actions';

// TODO: Should user dictate amount?
const WATER_AMOUNT = 25;

// TODO: Import from reducer
const PLANT_MAX_LEVEL = 3;

class ManageResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirmHarvest = this.handleConfirmHarvest.bind(this);

    this.state = {
      confirmHarvestModalOpen: false
    };
  }
  handleClose() {
    this.setState({
      confirmHarvestModalOpen: false
    });
  }
  handleConfirmHarvest() {
    // TODO: Redirect to animation screen
  }
  renderAllocateWaterButton() {
    const { id } = this.props.resource;

    return (<Button
      variant="raised"
      color="primary"
      onClick={() => {
        this.props.onAddWaterSelected(id)
    }}>Add water</Button>);
  }
  renderCollectWaterButton() {
    return (
      <Link to={routePaths.WEATHER_PAGE}>
        <Button
          variant="raised"
          color="primary"
        >Collect water</Button>
      </Link>
    );
  }
  render() {
    const { resource } = this.props;

    if (!resource) {
      return (<BasePage selectedTabId={TAB_ID_GARDEN}>
        <PageWidthContainer>
          Resource not found
        </PageWidthContainer>
      </BasePage>);
    }

    // TODO: Move to css
    const plantImageStyles = {
      display: 'block',
      margin: '0.5rem 0',
      // width: '7rem'
      width: '100%'
    };

    const CallToAction = this.props.water >= WATER_AMOUNT ?
      this.renderAllocateWaterButton() :
      this.renderCollectWaterButton();

    return (
      <BasePage selectedTabId={TAB_ID_GARDEN}>
        <PageWidthContainer>
          <Grid container spacing={16} alignItems="center">
            <Grid item>
              <h1>{resource.title}</h1>
            </Grid>
            <Grid item>
              <Chip label={`Level ${resource.stats.level}`} />
            </Grid>
          </Grid>

          <img style={plantImageStyles} alt={resource.title}
            src={resource.imageSrcFull} />
          <ResourceStatDisplay resource={resource} />

          <p><strong>Water</strong> your {resource.title} to evolve it into
          a bigger plant. <strong>Harvest</strong> the plant to earn rewards.</p>


          <Grid container spacing={16}>
            <Grid item>
              <Button
                variant="raised"
                onClick={() => this.setState({
                  confirmHarvestModalOpen: true
                })}
              >Harvest</Button>
            </Grid>

            <Dialog open={this.state.confirmHarvestModalOpen}
              onClose={this.handleClose}>
              <DialogTitle>
                Confirm Harvest
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <p>This will <strong>permanently</strong> remove the {resource.title} from your garden.
                  You may be rewarded with a <strong>treat</strong>.</p>

                  {/*
                  {resource.stats.level < PLANT_MAX_LEVEL && (
                    <p><strong>Tip:</strong> This plant is Level {resource.stats.level}.
                    Wait until it evolves to get a better reward...</p>
                  )}
                  */}

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={this.handleConfirmHarvest}>
                  Harvest
                  <img style={{paddingLeft: '0.5rem', width: '1rem'}} alt={resource.description} src={resource.imageSrc} />
                </Button>
              </DialogActions>
            </Dialog>

            <Grid item>
              {CallToAction}
            </Grid>
          </Grid>

          {/* TODO: Remove inline style */}
          <Divider style={{margin: '1.5rem 0'}} />

          <h3>Next-level Perks</h3>

          <p>As the plant evolves, your garden will grow bigger and more vibrant,
          revealing new perks at local coffee shops and restaurants.</p>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Evolves into</TableCell>
                <TableCell>Rewards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Donut Bush</TableCell>
                <TableCell>Chance of a free pastry</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Undiscovered</TableCell>
                <TableCell>Undiscovered</TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </PageWidthContainer>
      </BasePage>
    );
  }
}

ManageResourcePage.propTypes = {
  resource: PropTypes.shape({
    title: PropTypes.string
  })
};

const mapStateToProps = (state, ownProps) => {
  const { resourceId } = ownProps.match.params;
  return {
    water: state.resources.byId['water'].stats.amount,
    resource: state.resources.byId[resourceId]
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAddWaterSelected: (resourceId) => {
    const increasePlantWaterStatAction = resourceStatChanged(
      resourceId, STAT_WATER_LEVEL, WATER_AMOUNT, STAT_OPERATOR_ADD);

    const decreaseWaterResource = resourceStatChanged(
      'water', 'amount', WATER_AMOUNT, STAT_OPERATOR_SUBTRACT
    );

    dispatch(increasePlantWaterStatAction);
    dispatch(decreaseWaterResource);
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageResourcePage)
);
