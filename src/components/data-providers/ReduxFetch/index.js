import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const STATUS_FETCH_IDLE = 1;
const STATUS_FETCH_PENDING = 2;
const STATUS_FETCH_DONE = 3;
const STATUS_FETCH_FATAL = 4;

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

    try {
      const serverResponse = await window.fetch(props.endpoint)
        .then(rawResponse => rawResponse.json());

      this.log.push({
        status: STATUS_FETCH_DONE
      });

      const action = props.actionCreator(serverResponse);
      props.publishAction(action);

    } catch (error) {
      this.log.push({
        status: STATUS_FETCH_FATAL,
        error
      });
    } finally {
      // Use forceUpdate instead of assigning log to state because
      // log updates must be synchronous
      this.forceUpdate();
    }
  }

  render() {
    if (this.log.slice(-1)[0].status === STATUS_FETCH_FATAL) {
      const repoLink = "https://github.com/codyromano/simple-weather-service";
      return (<div>
          <h1>There was a problem fetching data.</h1>
          <p>Note for developers: Please ensure that <a href={repoLink}>
          simple-weather-service</a> is running and that <a href={this.props.endpoint}>{this.props.endpoint}</a> is
          returning data.</p>
        </div>)
    }
    return this.props.children;
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  publishAction: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFetch);
