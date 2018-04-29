import React from 'react';
import { resourceShape } from 'aurae-components/commonShapes';
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
