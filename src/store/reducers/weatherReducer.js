const initialState = {
  byId: {
    "rain": {
      title: "Rain",
      imageSrc: "https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/rain-06.jpg"
    },
    "clouds": {
      title: "Cloudiness",
      imageSrc: "https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/clouds.jpg"
    }
  },
  allIds: ["rain", "clouds"]
};

export default function weatherReducer(state = initialState) {
  return state;
}
