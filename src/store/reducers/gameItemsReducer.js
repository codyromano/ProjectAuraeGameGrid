const initialState = [
  {
    title: 'Sakura Tree',
    imageSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/Sakura.jpg',
    description: 'Description'
  },
  {
    title: 'Rose',
    imageSrc: '	https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/Rose.jpg',
    description: 'Description'
  },
  {
    title: 'Alaska Cedar Sprout',
    imageSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/cedar.jpg',
    description: 'Description'
  },
  {
    title: 'Blackfruit Dogwood',
    imageSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/Blackfruit_Dogwood.jpg',
    description: 'Description'
  }
];

export default function gameItemsReducer(
  state = initialState,
  action = {}
) {
  return state;
}
