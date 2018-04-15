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
      isCurrentWeatherCondition: false,
      intensity: 0,
      title: "Rain",
      imageSrc: "https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/rain-06.jpg"
    },
    clouds: {
      isCurrentWeatherCondition: false,
      intensity: 0,
      title: "Cloudiness",
      imageSrc: "https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/clouds.jpg"
    }
  },
  allIds: ["rain", "clouds"]
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

  Object.assign(newState.byId['rain'], {
    isCurrentWeatherCondition: isRainy,
    intensity: weatherApiResponse.rainIntensity
  });

  // TODO: Update status for cloudiness

  newState.summary.description = weatherApiResponse.summary;

  logApiFetchResult(newState, FETCH_OK);
  return newState;
}
