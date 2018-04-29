import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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
    const tabs = this.props.tabs.map((tab, key) => {
      const Component = Number.isInteger(tab.notices) ?
        TabWithNotices : BasicTab;
      return <Component {...tab} key={tab.id} />;
    });

    return (
      <Tabs
        centered={true}
        fullWidth={true}
        indicatorcolor="accent"
        textcolor="accent"
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
      label: PropTypes.string.isRequired,
      notices: PropTypes.number
    })
  ).isRequired
};

// Export without HOC for testing
export const TabsMenuBase = TabsMenu;
export default withRouter(TabsMenu);
