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
  render() {
    return (
      <Tabs
        indicatorcolor="primary"
        textcolor="primary"
        onChange={this.onChange}
      >
      {this.props.tabs.map(tab => (
          <Tab
            label={tab.label}
            value={tab.value || tab.pathname}
            key={tab.pathname}
            selected={tab.id === this.props.selectedTabId}
          />
        )
      )}
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
