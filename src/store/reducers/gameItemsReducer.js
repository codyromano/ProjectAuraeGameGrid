const initialState = [
  {
    title: 'White birch tree',
    imageSrc: 'https://www.pngarts.com/files/1/Sakura-PNG-Free-Download.png',
    description: 'Description'
  },
  {
    title: 'Rose cluster',
    imageSrc: 'https://vignette.wikia.nocookie.net/paradise-bay/images/4/4f/Rose.png/revision/latest?cb=20170328185143',
    description: 'Description'
  }
];

export default function gameItemsReducer(
  state = initialState,
  action = {}
) {
  return state;
}
