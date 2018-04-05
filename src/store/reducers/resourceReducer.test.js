import deepEqual from 'fast-deep-equal';
import { createStore } from 'redux';
import resourceReducer from './resourceReducer.js';
import { serializeGameObjectLocation } from '../gameDataUtils';
import { plantResourceAcquired } from '../actions';

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

  it(`pushes a resource ID to "allIds" that corresponds
    with the one in byId`, function () {
    const state = mockStore.getState();
    const resourceId = Object.keys(state.byId)[0];
    expect(state.allIds.includes(resourceId)).toBe(true);
  });

  it(`creates a record in "byPosition" that maps to the resource`,
    function () {
    const state = mockStore.getState();
    const position = serializeGameObjectLocation(mockLocation);
    const resourceIds = state.byPosition[position];
    expect(Array.isArray(resourceIds)).toBe(true);

    const resources = resourceIds
      .map(id => state.byId[id])
      .filter(resource => deepEqual(resource, mockResource));

    expect(resources.length).toBe(1);
  });
});
