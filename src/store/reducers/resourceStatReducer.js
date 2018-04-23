import clone from 'clone';
import {
  RESOURCE_STAT_CHANGED,
  STAT_OPERATOR_ADD,
  STAT_OPERATOR_SUBTRACT,
  STAT_OPERATOR_SET
} from '../actions';

// Child reducer of resourceReducer
export default function resourceStatReducer(state, action = {}) {
  if (action.type !== RESOURCE_STAT_CHANGED) {
    return state;
  }

  const newState = clone(state);
  const actionCopy = clone(action);

  const resource = newState.byId[actionCopy.resourceId];

  switch (actionCopy.operator) {
    case STAT_OPERATOR_SET:
      resource.stats[actionCopy.statName] = actionCopy.statValue;
    break;
    case STAT_OPERATOR_ADD:
      resource.stats[actionCopy.statName] += actionCopy.statValue;
    break;
    case STAT_OPERATOR_SUBTRACT:
      resource.stats[actionCopy.statName] -= actionCopy.statValue;
    break;
    default:
      // eslint-disable-next-line no-console
      console.error(`Unrecognized stat operator: ${actionCopy.operator}`);
    break;
  }

  return newState;
}
