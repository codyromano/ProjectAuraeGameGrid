import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import { MaterialUIProvider } from '../../layout';

import './BasePage.css';

import TabsMenu from '../../navigation/TabsMenu';
import tabsMenuConfig from '../../../config/tabsMenuConfig';

export default class BasePage extends React.Component {
  render() {
    return (
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
    );
  }
}

BasePage.propTypes = {
  selectedTabId: PropTypes.string.isRequired
};
