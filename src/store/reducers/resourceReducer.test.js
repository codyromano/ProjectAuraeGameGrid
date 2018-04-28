import deepEqual from 'fast-deep-equal';
import { createStore } from 'redux';
import resourceReducer from './resourceReducer.js';
import { serializeGameObjectLocation } from '../gameDataUtils';
import { plantResourceAcquired } from '../actions';
import resourceTypes from 'aurae-config/resourceTypes';
import { CLASS_PLANT } from 'aurae-config/resourceClasses';

describe('resourceReducer', function() {
  let mockStore;
  let mockResource;
  let mockLocation;
  let action;

  beforeEach(() => {
    mockStore = createStore(resourceReducer);
    // Use the first plant-type resource for tests. A more comprehensive
    // test suite could iterate through all resources, including non-plants.
    mockResource = resourceTypes.find(resource =>
      resource.class === CLASS_PLANT);
    mockLocation = [1, 1];
    action = plantResourceAcquired(mockResource, mockLocation);
    mockStore.dispatch(action);
  });

  it('assigns a resource to "byId"', function() {
    const state = mockStore.getState();
    const mockId = mockResource.resourceTypeId;
    const matchingResource = Object.values(state.byId)
      .find(resource => resource.resourceTypeId === mockId);

    expect(typeof matchingResource).toBe('object');
    expect(matchingResource).toEqual(
      expect.objectContaining(mockResource)
    );
  });

  it(`pushes a resource ID to "allIds" that corresponds
    with the one in byId`, function () {
    const state = mockStore.getState();

    const mockId = mockResource.resourceTypeId;
    const resource = Object.values(state.byId)
      .find(resource => resource.resourceTypeId === mockId);

    expect(state.allIds).toEqual(
      expect.arrayContaining([resource.id])
    );
  });

  it(`creates a record in "byPosition" that maps to the resource`,
    function () {
    const state = mockStore.getState();
    const position = serializeGameObjectLocation(mockLocation);
    const resourceIds = state.byPosition[position];

    // Ensure an id was generated and inserted into all IDs
    expect(Array.isArray(resourceIds)).toBe(true);
    expect(typeof resourceIds[0]).toBe('string');

    // expect(typeof id).toBe('string');
    // expect(id.length).toBeGreaterThanOrEqual(1);



    /*
    const resources = resourceIds
      .map(id => state.byId[id])
      // .filter(resource => deepEqual(resource, mockResource));

    throw new Error(JSON.stringify(state, '\n'));

    expect(resources.length).toBe(1);
    */
  });
});
