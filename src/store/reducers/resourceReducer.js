import uniqid from 'uniqid';
import clone from 'clone';
import { RESOURCE_ACQUIRED, CLASS_CURRENCY } from '../actions';
import { resourceHandlerFactory } from './resource-handlers';

const initialState = {
  byId: {
    water: {
      id: 'water',
      name: 'Water',
      class: CLASS_CURRENCY,
      amount: 0.25
    }
  },
  byClass: {
    [CLASS_CURRENCY]: ['water']
  },
  byPosition: {},
  allIds: []
};

export default function resourceReducer(
  state = initialState,
  action = {}
) {
  let newState = clone(state);
  const actionCopy = clone(action);

  switch (action.type) {
    case RESOURCE_ACQUIRED:
      // An ID that has some meaning with respect to the resource is
      // recommended. If the action has no 'id', we fall back to a GUID.
      // For example: prefer to use "water" as ID for water resource
      const id = (typeof actionCopy.id !== 'undefined') ?
        actionCopy.id : uniqid();

      newState.byId[id] = Object.assign(
        newState.byId[id] || {},
        actionCopy.resource
      );

      newState.byId[id].id = id;
      newState.byId[id].class = actionCopy.class;

      // If the resource doesn't already exist, create a mapping of its
      // id and class attributes. This allows components to
      // look up the resource.
      if (!newState.byId[id]) {
        newState.allIds.push(id);
        newState.byClass[actionCopy.class] = newState.byClass[actionCopy.class] || [];
        newState.byClass[actionCopy.class].push(id);
      }

      const applyResourceClassLogic = resourceHandlerFactory(actionCopy.class, id);
      newState = applyResourceClassLogic(newState, actionCopy);

    break;
    default:
    break;
  }

  return newState;
}
