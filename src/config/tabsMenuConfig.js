import { routePaths } from '../routes';

export const TAB_ID_GARDEN = 'garden';
export const TAB_ID_WEATHER = 'weather';

export default [
  {
    id: TAB_ID_GARDEN,
    label: 'Your Garden',
    pathname: routePaths.VIEW_GARDEN
  },
  {
    id: TAB_ID_WEATHER,
    label: 'Weather',
    pathname: routePaths.WEATHER_PAGE
  }
];
