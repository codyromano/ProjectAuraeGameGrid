import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';
import TabWithNotices from './TabWithNotices';
import routes from 'aurae-config/routes.json';

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
        value={routes.pages[this.props.routeId].path}
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
      notices: PropTypes.number
    })
  ).isRequired
};

// Export without HOC for testing
export const TabsMenuBase = TabsMenu;
export default withRouter(TabsMenu);
