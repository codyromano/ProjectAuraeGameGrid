import React from 'react';
import pick from 'object.pick';
// import PropTypes from 'prop-types';
import { Tab } from 'material-ui/Tabs';
import { CLASS_TREAT } from 'aurae-config/resourceClasses';
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';
import './TabsMenu.css';

const TabWithNotices = (props) => {
  const extraClasses = {};
  if (props.totalUnreadNotices) {
    extraClasses.root = 'selectedLabel';
  }
  const chip = <Chip classes={extraClasses} label={props.totalUnreadNotices}/>;
  const componentProps = pick(props,
    ['value', 'id', 'label', 'pathname', 'onChange']);

  return (<Tab
    {...componentProps}
    indicator={chip}
  />);
};

const mapStateToProps = (state) => {
  // Currently the notice consists only of treats, but this could be expanded
  // for a more general purpose.
  const notices = state.resources.byClass[CLASS_TREAT].map(id =>
    state.resources.byId[id]
  );
  const totalUnreadNotices = notices.filter(
    notice => !notice.seenByUser
  ).length;

  return { notices, totalUnreadNotices };
};
export default connect(mapStateToProps)(TabWithNotices);
