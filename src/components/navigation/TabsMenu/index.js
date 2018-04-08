import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';

class TabsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(tabPathname) {
    this.props.history.push(tabPathname);
  }
  // https://material-ui-next.com/api/tabs/
  getSelectedTabPathname() {
    const selectedTabIndex = this.props.tabs.findIndex(
      tab => tab.id === this.props.selectedTabId
    );
    if (selectedTabIndex === -1) {
      return false;
    }
    return this.props.tabs[selectedTabIndex].pathname;
  }
  render() {
    const selectedTabValue = this.props.tabs.findIndex(
      tab => tab.id === this.props.selectedTabId
    );
    const tabs = this.props.tabs.map(tab => (
      <Tab
        label={tab.label}
        value={tab.pathname}
        key={tab.pathname}
      />
    ));

    return (
      <Tabs
        indicatorcolor="primary"
        textcolor="primary"
        onChange={this.onChange}
        value={this.getSelectedTabPathname()}
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
  isSelectedTab: PropTypes.func,
  onChange: PropTypes.func,

  // Provided
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  selectedTabId: PropTypes.string.isRequired,

  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      value: PropTypes.string,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

// Export without HOC for testing
export const TabsMenuBase = TabsMenu;
export default withRouter(TabsMenu);
