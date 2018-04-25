const path = require('path');

const aliases = {
  'aurae-reducers': 'src/store/reducers',
  'aurae-actions': 'src/store/actions',
  'aurae-config': 'src/config',
  'aurae-components': 'src/components',
  'aurae-pages': 'src/components/pages',
  'aurae-common-shapes': 'src/components/commonShapes',
  'aurae-resource-classes': 'src/config/resourceClasses',
  'aurae-routes': 'src/routes.js'
};

module.exports = Object.keys(aliases).reduce((map, alias) => {
  map[alias] = path.join(__dirname, '..', aliases[alias]);
  return map;
}, {});
