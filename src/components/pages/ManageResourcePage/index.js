import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';

import ResourceStatDisplay from 'aurae-components/resources/ResourceStatDisplay';
import BasePage from 'aurae-components/pages/BasePage';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_GARDEN } from 'aurae-config/tabsMenuConfig';
import {
  STAT_WATER_LEVEL,
  STAT_OPERATOR_ADD,
  resourceStatChanged
} from 'aurae-actions';

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
      width: '7rem'
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

          <img style={plantImageStyles} alt={resource.title} src={resource.imageSrc} />
          <ResourceStatDisplay resource={resource} />
          <p>{resource.fullDescription}</p>

          <Button
            variant="raised"
            color="primary"
            onClick={() => {
            this.props.resourceStatChanged(
              id,
              STAT_WATER_LEVEL,
              5,
              STAT_OPERATOR_ADD
            )
          }}>Add water</Button>

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
    resource: state.resources.byId[resourceId]
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resourceStatChanged
}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageResourcePage)
);
