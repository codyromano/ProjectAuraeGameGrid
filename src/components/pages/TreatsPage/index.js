import React from 'react';
import { CLASS_TREAT } from 'aurae-config/resourceClasses';
import { PageWidthContainer } from 'aurae-components/layout';
import { connect } from 'react-redux';

class TreatsPage extends React.Component {
  render = () => (
    <PageWidthContainer>
      <ul>
        {this.props.treats.map(treat => (
          <li>{treat.title}</li>
        ))}
      </ul>
    </PageWidthContainer>
  )
}

const mapStateToProps = (state) => ({
  treats: state.resources.byClass[CLASS_TREAT]
    .map(id => state.resources.byId[id])
});
export default connect(mapStateToProps)(TreatsPage);
