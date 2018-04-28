function getEvolvedResource(possibleNextItems, entropy) {
  for (const item of possibleNextItems) {
    if (item.probability <= entropy) {
      return item;
    }
  }
  // Fall back to the most common resource if none
  const mostCommonResource = possibleNextItems.sort(
    (itemA, itemB) => itemA.probability > itemB.probability
  )[0];
  return mostCommonResource;
}

export default function resourceEvolved() {
  // Select a random plant into which the current plant should evolve
  const nextItemId = getEvolvedResource(
    this.props.evolvesIntoItems, Math.random()).childId;
  const nextItem = resourceTypes.find(
    item => item.resourceTypeId === nextItemId);

  // Maintain the current id
  nextItem.id = this.props.resource.id;
  // TODO: Maintain the position on the map

  this.props.evolveResource(nextItem);
}
