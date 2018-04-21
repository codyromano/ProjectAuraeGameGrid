import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import BasePage from '../BasePage';
import { PageWidthContainer } from '../../layout';
import { TAB_ID_GARDEN } from '../../../config/tabsMenuConfig';

class ManageResourcePage extends React.Component {
  render() {
    console.log(this.props.resource);

    if (!this.props.resource) {
      return (<BasePage selectedTabId={TAB_ID_GARDEN}>
        <PageWidthContainer>
          Resource not found
        </PageWidthContainer>
      </BasePage>);
    }
    return (
      <BasePage selectedTabId={TAB_ID_GARDEN}>
        <PageWidthContainer>
          <h1>{this.props.resource.title}</h1>
          <img alt={this.props.resource.title} src={this.props.resource.imageSrc} />
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
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageResourcePage)
);
