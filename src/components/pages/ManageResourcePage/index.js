import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';

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
const WATER_AMOUNT = 5;

class ManageResourcePage extends React.Component {
  render() {
    const { resource } = this.props;

    if (!resource) {
      return (<BasePage selectedTabId={TAB_ID_GARDEN}>
        <PageWidthContainer>
          Resource not found
        </PageWidthContainer>
      </BasePage>);
    }


    const { id } = resource;
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

          <p>Water your Sugar Sprout to <strong>evolve</strong> it into
          a <strong>Donut Bush</strong>.</p>

          <Grid container spacing={16}>
            <Grid item>
              <Button variant="raised">Customize</Button>
            </Grid>

            <Grid item>
              {this.props.water >= WATER_AMOUNT && (
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => {
                    this.props.onAddWaterSelected(id)
                }}>Add water</Button>
              )}
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
            <TableBody stripedRows={true}>
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
