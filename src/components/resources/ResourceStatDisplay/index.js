import React from 'react';
import { resourceShape } from 'aurae-common-shapes';
import { CLASS_PLANT } from 'aurae-config/resourceClasses';
import PlantStatDisplay from './PlantStatDisplay';

const mapResourceClassToView = {
  [CLASS_PLANT]: PlantStatDisplay
};

const ResourceStatDisplay = (props) => {
  const Component = mapResourceClassToView[props.resource.class];
  return <Component {...props} />;
};

ResourceStatDisplay.propTypes = {
  resource: resourceShape
};

export default ResourceStatDisplay;
