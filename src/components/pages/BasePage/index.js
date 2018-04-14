import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import { MaterialUIProvider } from '../../layout';

import './BasePage.css';

import TabsMenu from '../../navigation/TabsMenu';
import tabsMenuConfig from '../../../config/tabsMenuConfig';
import { weatherDataFetched } from '../../../store/actions';
import ReduxFetch from '../../data-providers/ReduxFetch';

// TODO: Move to network settings in /config
const endpoint = 'http://localhost:8000/weather/seattle';

export default class BasePage extends React.Component {
  render() {
    return (
      <ReduxFetch endpoint={endpoint} actionCreator={weatherDataFetched}>
        <MaterialUIProvider>
          <main>
            <Paper>
              <TabsMenu
                tabs={tabsMenuConfig}
                selectedTabId={this.props.selectedTabId}
              />
            </Paper>
            <section className="base-page-content">
              {this.props.children}
            </section>
          </main>
        </MaterialUIProvider>
      </ReduxFetch>
    );
  }
}

BasePage.propTypes = {
  selectedTabId: PropTypes.string.isRequired
};
