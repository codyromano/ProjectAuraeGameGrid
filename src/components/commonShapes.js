import PropTypes from 'prop-types';

export const resourceShape = PropTypes.shape({
  class: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    level: PropTypes.number.isRequired
  }).isRequired
});
