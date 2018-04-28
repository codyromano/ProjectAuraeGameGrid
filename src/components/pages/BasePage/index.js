import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import { MaterialUIProvider } from '../../layout';

import './BasePage.css';

import TabsMenu from 'aurae-components/navigation/TabsMenu';
import tabsMenuConfig from 'aurae-config/tabsMenuConfig';
import { GET_CURRENT_WEATHER } from 'aurae-config/endpoints';
import { weatherDataFetched } from 'aurae-store/actions';
import ReduxFetch from 'aurae-components/data-providers/ReduxFetch';
import CurrencyDisplay from 'aurae-components/resources/CurrencyDisplay';

export default class BasePage extends React.Component {
  render() {
    return (
      <ReduxFetch endpoint={GET_CURRENT_WEATHER} actionCreator={weatherDataFetched}>
        <MaterialUIProvider>
          <main>
            <Paper>
              <TabsMenu
                tabs={tabsMenuConfig}
                selectedTabId={this.props.selectedTabId}
              />
            </Paper>
            <section className="basePageContent">
              {this.props.children}
            </section>
            <footer>
              <CurrencyDisplay />
            </footer>
          </main>
        </MaterialUIProvider>
      </ReduxFetch>
    );
  }
}

BasePage.propTypes = {
  selectedTabId: PropTypes.string.isRequired
};
