import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routePaths from 'aurae-config/routePaths';
import { SoundEffect } from 'aurae-components/data-providers/WrappedWithSound';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';
import { WATER_AMOUNT } from 'aurae-store/actions';

const AllocateWaterButton = ({ resource, onAddWaterSelected }) => (<Button
    variant="raised"
    color="primary"
    onClick={() => onAddWaterSelected(resource.id)}>Add water</Button>
);

AllocateWaterButton.propTypes = {
  onAddWaterSelected: PropTypes.func.isRequired,
  resource: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

const CollectWaterButton = () => (
  <Link to={routePaths.WEATHER_PAGE}>
    <Button
      variant="raised"
      color="primary"
    >Collect water</Button>
  </Link>
);

const EvolveButton = ({ onEvolution }) => (
  <SoundEffect audioUrl="https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/sound-effects/power-up.mp3">
    <Button
      onClick={() => onEvolution()}
      variant="raised"
      color="primary"
    >Evolve</Button>
  </SoundEffect>
);

const ManageResourceActions = ({
  water,
  onAddWaterSelected,
  onEvolution,
  resource,
  confirmModalOpen,
  onConfirmHarvestClicked,
  onModalClosed,
  onModalConfirmed
}) => {

  const CallToAction = water >= WATER_AMOUNT ?
    AllocateWaterButton :
    CollectWaterButton;

  return (<Grid container spacing={16}>
    <Grid item>
      <Button
        variant="raised"
        onClick={onConfirmHarvestClicked}
      >Harvest</Button>
    </Grid>

    <Dialog open={confirmModalOpen}
      onClose={onModalClosed}>
      <DialogTitle>
        Confirm Harvest
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <span>This will <strong>permanently</strong> remove the {resource.title} from your garden.
          You may be rewarded with a <strong>treat</strong>.</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onModalClosed}>
          Cancel
        </Button>
        <Button color="primary" onClick={onModalConfirmed}>
          Harvest
          <img style={{paddingLeft: '0.5rem', width: '1rem'}}
            alt={resource.description}
            src={resource.imageSrc} />
        </Button>
      </DialogActions>
    </Dialog>

    <Grid item>
      {resource.stats.waterLevel === 100 &&
        resource.evolvesInto.length > 0 && (
        <SoundEffect audioUrl={resource.evolveSound}>
          <EvolveButton onEvolution={onEvolution} />
        </SoundEffect>
      )}
      {resource.stats.waterLevel < 100 && (
        <CallToAction onAddWaterSelected={onAddWaterSelected}
          resource={resource}/>
      )}
    </Grid>
  </Grid>);
};

ManageResourceActions.defaultProps = {
  onModalClosed: () => {},
  onModalConfirmed: () => {}
};

ManageResourceActions.propTypes = {
  onModalClosed: PropTypes.func.isRequired,
  onModalConfirmed: PropTypes.func.isRequired
}

export default ManageResourceActions;
