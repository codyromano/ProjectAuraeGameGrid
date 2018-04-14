import { WEATHER_DATA_FETCHED } from '../actions';

const initialState = {
  summary: {
    description: 'Unknown weather'
  },
  byId: {
    rain: {
      volumeLastThreeHours: null,
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

export default function weatherReducer(state = initialState, action) {
  if (action.type !== WEATHER_DATA_FETCHED) {
    return state;
  }

  const newState = {...state};
  const latestWeatherData = action.weatherData.data.list.slice(-1)[0];

  newState.byId['rain'].volumeLastThreeHours = latestWeatherData.rain['3h'];
  newState.summary.description = latestWeatherData.weather.slice(-1)[0].description;

  console.log(latestWeatherData);

  return newState;
}
