import React from 'react';
import { CLASS_TREAT } from 'aurae-config/resourceClasses';
import { PageWidthContainer } from 'aurae-components/layout';
import { userSawResources } from 'aurae-store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewTreats from './NewTreats';
import UnlockedTreats from './UnlockedTreats';

class TreatsPage extends React.Component {
  componentDidMount() {
    const resourceIds = this.props.treats.map(treat => treat.id);
    this.props.userSawResources(resourceIds);
  }
  render() {
    const lockedTreats = this.props.treats
      .filter(treat => treat.stats.unlocked === false);

    const unlockedTreats = this.props.treats
      .filter(treat => treat.stats.unlocked === true);

    return (
      <PageWidthContainer>
        {lockedTreats.length > 0 && <NewTreats treats={lockedTreats} />}
        {unlockedTreats.length > 0 && <UnlockedTreats treats={unlockedTreats} />}
      </PageWidthContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  userSawResources
}, dispatch);

const mapStateToProps = (state) => ({
  treats: state.resources.byClass[CLASS_TREAT]
    .map(id => state.resources.byId[id])
});
export default connect(mapStateToProps, mapDispatchToProps)(TreatsPage);
