import uniqid from 'uniqid';
import clone from 'clone';
import {
  RESOURCE_STAT_CHANGED,
  RESOURCE_SEEN_BY_USER,
  RESOURCE_ACQUIRED,
  RESOURCE_DELETED
} from 'aurae-store/actions/index';
import { CLASS_CURRENCY, CLASS_TREAT } from 'aurae-config/resourceClasses';
import { resourceHandlerFactory } from './resource-handlers';
import resourceStatReducer from './resourceStatReducer';

const removeFromArray = (array, predicate) => {
  const target = array.findIndex(predicate);
  return array.splice(target, 1);
};

const initialState = {
  byId: {
    water: {
      id: 'water',
      name: 'Water',
      class: CLASS_CURRENCY,
      iconSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/resource-icon-water.jpeg',
      iconAlt: 'Water currency',
      stats: {
        // Give the player some initial water to get started
        // learning about the game even if it's not raining
        amount: 300
      }
    },
    seeds: {
      id: 'seeds',
      name: 'Seeds',
      class: CLASS_CURRENCY,
      iconSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/resource-icon-seed.jpg',
      iconAlt: 'Seed currency',
      stats: {
        amount: 5
      }
    },
    gold: {
      id: 'gold',
      name: 'Gold',
      class: CLASS_CURRENCY,
      iconSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/resource-icon-gold.jpg',
      iconAlt: 'Gold currency',
      stats: {
        amount: 0
      }
    }
  },
  byClass: {
    [CLASS_CURRENCY]: ['water', 'seeds', 'gold'],
    [CLASS_TREAT]: []
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
  // let newState = state;
  // const actionCopy = action;

  switch (action.type) {
    case RESOURCE_ACQUIRED:
      // An ID that has some meaning with respect to the resource is
      // recommended. If the action has no 'id', we fall back to a GUID.
      // For example: prefer to use "water" as ID for water resource
      const id = (typeof actionCopy.id !== 'undefined') ?
        actionCopy.id : uniqid();

      // If the resource doesn't already exist, create a mapping of its
      // id and class attributes. This allows components to
      // look up the resource.
      if (!newState.byId[id]) {
        newState.allIds.push(id);
        newState.byClass[actionCopy.class] = newState.byClass[actionCopy.class] || [];
        newState.byClass[actionCopy.class].push(id);
      }

      const resourceTemplate = newState.byId[id] || {};
      newState.byId[id] = Object.assign(resourceTemplate, actionCopy.resource);

      newState.byId[id].id = id;
      newState.byId[id].timeCreated = new Date().getTime();
      newState.byId[id].class = actionCopy.class;

      const applyResourceClassLogic = resourceHandlerFactory(actionCopy.class, id);
      newState = applyResourceClassLogic(newState, actionCopy);

    break;
    case RESOURCE_DELETED:
      const matchIdPredicate = id => id === action.resourceId;

      delete newState.byId[action.resourceId];
      removeFromArray(newState.allIds, matchIdPredicate);

      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(newState.byPosition)) {
        removeFromArray(value, matchIdPredicate);
      }


    break;
    case RESOURCE_STAT_CHANGED:
      newState = resourceStatReducer(newState, actionCopy);
    break;
    case RESOURCE_SEEN_BY_USER:
      actionCopy.resourceIds.forEach(id => {
        newState.byId[id].seenByUser = true;
      });
    break;
    default:
    break;
  }

  return newState;
}
