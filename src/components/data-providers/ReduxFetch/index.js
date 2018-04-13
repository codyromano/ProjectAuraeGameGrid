import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const STATUS_FETCH_IDLE = 1;
const STATUS_FETCH_PENDING = 2;
const STATUS_FETCH_DONE = 3;

class ReduxFetch extends React.Component {

  static propTypes = {
    actionCreator: PropTypes.func.isRequired,
    endpoint: PropTypes.string.isRequired,
    // Provided by connect()
    publishAction: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.log = [{
      status: STATUS_FETCH_IDLE
    }];

    if (this.shouldFetchAndNotify(props)) {
      this.fetchAndNotifyRedux(props);
    }
  }

  shouldFetchAndNotify(props) {
    const latestRequest = this.log.slice(-1)[0];
    return latestRequest.status === STATUS_FETCH_IDLE;
  }

  async fetchAndNotifyRedux(props) {
    this.log.push({
      status: STATUS_FETCH_PENDING
    });

    // TODO: Handle exception
    const serverResponse = await window.fetch(props.endpoint)
      .then(rawResponse => rawResponse.json())
      .catch(error => console.error(error));

    this.log.push({
      status: STATUS_FETCH_DONE
    });

    const action = props.actionCreator(serverResponse);
    props.publishAction(action);
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  publishAction: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFetch);
