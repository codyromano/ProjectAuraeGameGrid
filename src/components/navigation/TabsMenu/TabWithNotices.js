import React from 'react';
// import PropTypes from 'prop-types';
import { Tab } from 'material-ui/Tabs';
import Chip from 'material-ui/Chip';
import './TabsMenu.css';

const TabWithNotices = (props) => {
  const extraClasses = {};
  if (props.notices) {
    extraClasses.root = 'selectedLabel';
  }
  const chip = <Chip classes={extraClasses} label={props.notices}/>;

  return (<Tab
    {...props}
    indicator={chip}
  />);
};

export default TabWithNotices;
