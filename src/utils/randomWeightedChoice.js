/**
* @param {Array} items Each element must include a 'weight' attribute
* @param {Function} entropyMethod Must return float between 0-1
*/
export default function randomWeightedChoice(
  items,
  entropyMethod = Math.random
) {
  if (!items.length) {
    return null;
  }
  const totalProbability = items.reduce((total, item) =>
    total + item.weight, 0);

  if (totalProbability !== 1) {
    throw new RangeError(`Item weights must sum to 1`);
  }

  const sortedItems = items.sort((a, b) => a.weight > b.weight);
  let remainingProbability = 1;

  const entropy = entropyMethod();
  for (const item of sortedItems) {
    if (item.weight >= remainingProbability * entropy) {
      return item;
    }
    remainingProbability -= item.weight;
  }
}
