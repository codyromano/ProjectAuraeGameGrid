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
      volumeLastThreeHours: 0,
      title: "Rain",
      imageSrc: "https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/rain-06.jpg"
    },
    clouds: {
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

  const latestWeatherData = actionCopy.weatherData.data.list.slice(-1)[0];
  const volumeLastThreeHours = latestWeatherData.rain['3h'];

  if (Number.isFinite(volumeLastThreeHours)) {
    Object.assign(newState.byId['rain'], { volumeLastThreeHours });

    const { description } = latestWeatherData.weather.slice(-1)[0];
    Object.assign(newState.summary, { description });

    logApiFetchResult(newState, FETCH_OK);
  } else {
    logApiFetchResult(newState, FETCH_FAIL);
  }

  return newState;
}
