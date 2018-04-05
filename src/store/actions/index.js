// Actions
export const TILE_SELECTED = 'tileSelected';
export const PLACE_RESOURCE_CONFIRMED = 'confirmed';
export const RESOURCE_ACQUIRED = 'acquired';

// TODO: Move to game object class def file
export const CLASS_PLANT = 'plant';

export const tileSelected = (coords) => ({
  type: TILE_SELECTED,
  coords
});

export const plantResourceAcquired = (resource, selectedCoords) => {
  return ({
    type: RESOURCE_ACQUIRED,
    class: CLASS_PLANT,
    selectedCoords,
    resource
  });
};

export const resourceSelectionConfirmed = (resource) => {
  return ({
    type: PLACE_RESOURCE_CONFIRMED,
    resource
  });
};
