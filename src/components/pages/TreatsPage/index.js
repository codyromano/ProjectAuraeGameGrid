import React from 'react';
import BasePage from 'aurae-pages/BasePage';
import { TAB_ID_TREATS } from 'aurae-config/tabsMenuConfig';
import { PageWidthContainer } from 'aurae-components/layout';

export default class TreatsPage extends React.Component {
  render = () => (
    <BasePage selectedTabId={TAB_ID_TREATS}>
      <PageWidthContainer>
        Placeholder treats page
      </PageWidthContainer>
    </BasePage>
  )
}
