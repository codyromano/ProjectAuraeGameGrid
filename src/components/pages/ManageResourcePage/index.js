import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BasePage from '../BasePage';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_GARDEN } from '../../../config/tabsMenuConfig';
import {
  STAT_WATER_LEVEL,
  STAT_OPERATOR_ADD,
  resourceStatChanged
} from '../../../store/actions';

class ManageResourcePage extends React.Component {
  render() {
    if (!this.props.resource) {
      return (<BasePage selectedTabId={TAB_ID_GARDEN}>
        <PageWidthContainer>
          Resource not found
        </PageWidthContainer>
      </BasePage>);
    }

    const { id } = this.props.resource;

    return (
      <BasePage selectedTabId={TAB_ID_GARDEN}>
        <PageWidthContainer>
          <h1>{this.props.resource.title}</h1>
          <img alt={this.props.resource.title} src={this.props.resource.imageSrc} />
          <button onClick={() => {
            this.props.resourceStatChanged(
              id,
              STAT_WATER_LEVEL,
              100,
              STAT_OPERATOR_ADD
            )
          }}>Increase plant water level</button>
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
