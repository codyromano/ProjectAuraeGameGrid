import deepEqual from 'fast-deep-equal';
import { createStore } from 'redux';
import resourceReducer from '/src/store/reducers/resourceReducer.js';
import { plantResourceAcquired } from '/src/store/actions';

describe('resourceReducer', function() {
  const mockStore = createStore(resourceReducer);
  const mockResource = {
    title: 'My resource',
    imageSrc: 'resource.png'
  };
  const mockLocation = [1, 2];
  const action = plantResourceAcquired(mockResource, mockLocation);
  mockStore.dispatch(action);

  it('assigns a resource to "byId"', function() {
    const state = mockStore.getState();
    const matchingResources = Object.values(state.byId)
      .filter(resource => deepEqual(resource, mockResource));

    expect(matchingResources.length).toBe(1);
  });

  it('assigns a resource to "allIds"', function () {
    const state = mockStore.getState();


  });
});
