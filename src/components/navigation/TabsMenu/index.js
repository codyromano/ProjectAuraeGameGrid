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
          selected={this.props.isSelectedTab(tab)}
        />
      ))}
      </Tabs>
    );
  }
}

TabsMenu.defaultProps = {
  isSelectedTab: (tab) => window.location.pathname.includes(tab.pathname),
  onChange: () => {}
};

TabsMenu.propTypes = {
  isSelectedTab: PropTypes.func,
  onChange: PropTypes.func,

  // Provided
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      value: PropTypes.string,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default withRouter(TabsMenu);
