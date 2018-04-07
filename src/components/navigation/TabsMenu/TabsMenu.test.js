import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MaterialUIProvider } from '../../layout';
import tabsInfo from '../../../config/tabsMenuConfig';
// Import TabsMenuBase without the "withRouter" wrapper so
// we can easily mock this dependency
import { TabsMenuBase } from './index';

configure({ adapter: new Adapter() });

// TODO: Move to test utils folder
const TestContext = ({ children, mockHistory }) => (
  <MemoryRouter>
    <MaterialUIProvider>
      {children}
    </MaterialUIProvider>
  </MemoryRouter>
);

const defaultMockHistory = ({
  push: () => {}
});

const createMockTestTabs = (mockHistory = defaultMockHistory) => 
  mount(
    <TestContext>
      <TabsMenuBase history={mockHistory} tabs={tabsInfo} />
    </TestContext>
  );

describe('TabsMenu', function() {
  const TAB_COMPONENT_NAME = 'Tab';

  it('should render tabs', () => {
    const TestTabsMenu = createMockTestTabs();
    const renderedTabs = TestTabsMenu.find(TAB_COMPONENT_NAME).length;

    expect(renderedTabs).toBe(tabsInfo.length);
  });
});
