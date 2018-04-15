import clone from 'clone';
import { WEATHER_DATA_FETCHED } from '../actions';

export const FETCH_FAIL = 1;
export const FETCH_OK = 2;
export const FETCH_PENDING = 3;

const initialState = {
  summary: {
    description: 'Unknown weather',
    networkRequestLog: [{
      status: FETCH_PENDING,
      time: new Date().getTime()
    }]
  },
  byId: {
    rain: {
      id: 'water',
      isCurrentWeatherCondition: false,
      intensity: 0,
      intensityDescriptor: '{intensity}ml per hour',
      title: "It's raining!",
      description: `When it's raining in your area, you can collect water
      to use in your garden. Water makes your plants grow.`,
      noun: "Water",
      imageSrc: "https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/rain-06.jpg"
    }
  },
  allIds: ["rain"]
};

/**
* @private
*/
function logApiFetchResult(state, status, ...data) {
  state.summary.networkRequestLog.push({
    status,
    time: new Date().getTime(),
    ...data
  });
  return state;
}

export default function weatherReducer(state = initialState, action) {
  if (action.type !== WEATHER_DATA_FETCHED) {
    return state;
  }

  const actionCopy = clone(action);
  const newState = clone(state);

  const weatherApiResponse = actionCopy.weatherData.data;

  if (!weatherApiResponse) {
    logApiFetchResult(newState, FETCH_FAIL);
    return newState;
  }

  const isRainy = weatherApiResponse.rainIntensity > 0;
  const MOCK_EXTRA_RAIN = 0.5;

  Object.assign(newState.byId['rain'], {
    isCurrentWeatherCondition: isRainy,
    // TODO: Remove mock
    intensity: weatherApiResponse.rainIntensity + MOCK_EXTRA_RAIN
  });

  // eslint-disable-next-line no-unused-vars
  for (const [id, resource] of Object.entries(newState.byId)) {
    // If there's an "{intensity}" placeholder in the description,
    // replace it with actual data
    resource.intensityDescriptor = resource.intensityDescriptor.replace(
      /{intensity}/g, resource.intensity
    );
  }

  // TODO: Update status for cloudiness

  newState.summary.description = weatherApiResponse.summary;

  logApiFetchResult(newState, FETCH_OK);
  return newState;
}
