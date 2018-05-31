import React from 'react';
import { CLASS_TREAT } from 'aurae-config/resourceClasses';
import { PageWidthContainer } from 'aurae-components/layout';
import { userSawResources } from 'aurae-store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Gift3DContainer from 'aurae-components/animation/Gift3DContainer';
import Grid from 'material-ui/Grid';

class TreatsPage extends React.Component {
  componentDidMount() {
    const resourceIds = this.props.treats.map(treat => treat.id);
    this.props.userSawResources(resourceIds);
  }
  render = () => (
    <PageWidthContainer>
      <Grid container>
        {this.props.treats.map(treat => (
          <Grid item key={treat.id}>
            <Gift3DContainer treat={treat} />
          </Grid>
        ))}
      </Grid>
    </PageWidthContainer>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  userSawResources
}, dispatch);

const mapStateToProps = (state) => ({
  treats: state.resources.byClass[CLASS_TREAT]
    .map(id => state.resources.byId[id])
});
export default connect(mapStateToProps, mapDispatchToProps)(TreatsPage);
