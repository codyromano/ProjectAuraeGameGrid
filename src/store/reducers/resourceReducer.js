import uniqid from 'uniqid';
import clone from 'clone';
import { RESOURCE_ACQUIRED } from '../actions';
import { resourceHandlerFactory } from './resource-handlers';

const initialState = {
  byId: {
    water: {
      amount: 0.25
    }
  },
  byClass: {},
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
      const id = (typeof actionCopy.id !== 'undefined') ?
        actionCopy.id : uniqid();

      newState.byId[id] = Object.assign(
        newState.byId[id] || {},
        actionCopy.resource
      );

      newState.byId[id].class = actionCopy.class;

      newState.allIds.push(id);
      newState.byClass[actionCopy.class] = newState.byClass[actionCopy.class] || [];
      newState.byClass[actionCopy.class].push(id);

      const applyResourceClassLogic = resourceHandlerFactory(actionCopy.class, id);
      newState = applyResourceClassLogic(newState, actionCopy);

    break;
    default:
    break;
  }

  return newState;
}
