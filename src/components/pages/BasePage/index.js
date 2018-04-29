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
import * as pages from 'aurae-components/pages';
import routes from 'aurae-config/routes.json';

export default class BasePage extends React.Component {
  render() {
    const routeInfo = routes.pages[this.props.routeId];
    const PageContent = pages[routeInfo.component];

    return (
      <ReduxFetch endpoint={GET_CURRENT_WEATHER} actionCreator={weatherDataFetched}>
        <MaterialUIProvider>
          <main>
            <Paper>
              <TabsMenu
                tabs={tabsMenuConfig}
                routeId={this.props.routeId}
              />
            </Paper>
            <section className="basePageContent">
              <PageContent {...this.props} />
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
  routeId: PropTypes.string.isRequired
};
