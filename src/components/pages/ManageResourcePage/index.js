import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import resourceTypes from 'aurae-config/resourceTypes';

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
import * as actions from 'aurae-actions';
import ManageResourceActions from './ManageResourceActions';
import randomWeightedChoice from 'aurae-utils/randomWeightedChoice';

class ManageResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirmHarvest = this.handleConfirmHarvest.bind(this);
    this.onEvolution = this.onEvolution.bind(this);

    this.state = {
      confirmHarvestModalOpen: false
    };
  }
  onEvolution() {
    // Select a random plant into which the current plant should evolve
    const nextItemId = randomWeightedChoice(
      this.props.evolvesIntoItems).childId;
    const nextItem = resourceTypes.find(
      item => item.resourceTypeId === nextItemId);

    // Maintain the current id and map location
    nextItem.id = this.props.resource.id;
    this.props.evolveResource(nextItem, this.props.resource.mapLocation);
  }
  handleClose() {
    this.setState({
      confirmHarvestModalOpen: false
    });
  }
  handleConfirmHarvest() {
    // TODO: Redirect to animation screen
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

          <ManageResourceActions
            resource={resource}
            water={this.props.water}
            onAddWaterSelected={this.props.onAddWaterSelected}
            onEvolution={this.onEvolution}
            confirmModalOpen={this.state.confirmHarvestModalOpen}
            onConfirmHarvestClicked={() => this.setState({
              confirmHarvestModalOpen: true
            })}
          />

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

  let evolvesIntoItems = state.resources.byId[resourceId];
  if (state.resources.byId[resourceId]) {
    evolvesIntoItems = state.resources.byId[resourceId].evolvesInto;
  }

  return {
    water: state.resources.byId['water'].stats.amount,
    resource: state.resources.byId[resourceId],
    evolvesIntoItems
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddWaterSelected: (resourceId) => {
    const increasePlantWaterStatAction = actions.resourceStatChanged(
      resourceId,
      actions.STAT_WATER_LEVEL,
      actions.WATER_AMOUNT,
      actions.STAT_OPERATOR_ADD
    );

    const decreaseWaterResource = actions.resourceStatChanged(
      'water', 'amount', actions.WATER_AMOUNT, actions.STAT_OPERATOR_SUBTRACT
    );

    dispatch(increasePlantWaterStatAction);
    dispatch(decreaseWaterResource);
  },
  evolveResource: (resource, coords) => {
    dispatch(
      actions.plantResourceAcquired(resource, coords)
    )
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageResourcePage)
);
