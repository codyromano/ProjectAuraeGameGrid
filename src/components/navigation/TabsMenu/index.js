import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import pick from 'object.pick';
import Tabs, { Tab } from 'material-ui/Tabs';
import TabWithNotices from './TabWithNotices';

const BasicTab = (props) => <Tab {...props} />;

class TabsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event, tabPathname) {
    this.props.history.push(tabPathname);
  }
  render() {
    const tabs = this.props.tabs.map((tab, key) => {
      const componentProps = pick(tab, ['value', 'id', 'label', 'pathname']);
      const Component = Number.isInteger(tab.notices) ?
        TabWithNotices : BasicTab;
      return <Component
        {...componentProps}
      key={tab.id} />;
    });

    const selectedValue = this.props.tabs.find(
      tab => tab.relatedRouteIds[this.props.routeId]
    ).value;

    return (
      <Tabs
        centered={true}
        fullWidth={true}
        indicatorcolor="accent"
        textcolor="accent"
        onChange={this.onChange}
        value={selectedValue}
      >
        {tabs}
      </Tabs>
    );
  }
}

TabsMenu.defaultProps = {
  onChange: () => {}
};

TabsMenu.propTypes = {
  routeId: PropTypes.string.isRequired,
  onChange: PropTypes.func,

  // Provided
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      value: PropTypes.string,
      label: PropTypes.string.isRequired,
      notices: PropTypes.number,
      relatedRouteIds: PropTypes.objectOf(
        PropTypes.bool.isRequired
      ).isRequired
    })
  ).isRequired
};

// Export without HOC for testing
export const TabsMenuBase = TabsMenu;
export default withRouter(TabsMenu);
