const { hostname, protocol } = window.location;
export const GET_CURRENT_WEATHER = `${protocol}//${hostname}:8000/weather/seattle`;
