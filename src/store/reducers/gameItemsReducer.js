const initialState = [
  {
    title: 'Sweet Sprout',
    itemClassDescription: 'Dessert plant',
    fullDescription: `Discovered by Belgian explorers in the year 2035, the Sweet Sprout
      is a mystical cold-weather plant. With enough water, it evolves into the Sugar
      Oak: a mighty tree that yields baked delicacies.`,
    imageSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/plant-image-sugar-sprout.jpg',
    stats: {
      level: 1
    }
  },
  {
    title: 'Steam Bean',
    itemClassDescription: 'Coffee plant',
    fullDescription: `A marvel of genetic engineering, the Steam Bean contains billions
      of nanorobots. They arrange themselves into cappuccino art while your
      neighborhood barista pours you a cup.`,
    imageSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/plant-image-sugar-java-bean.jpg',
    stats: {
      level: 1
    }
  }
];

export default function gameItemsReducer(
  state = initialState,
  action = {}
) {
  return state;
}
