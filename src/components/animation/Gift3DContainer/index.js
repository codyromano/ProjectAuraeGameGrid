import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Gift3D from 'aurae-components/animation/Gift3D';
import './Gift3DContainer.css';

const createAudio = (src, loop = false) => {
  const audio = document.createElement('audio');
  audio.loop = loop;
  audio.src = src;
  return audio;
};

export default class GiftContainer extends React.Component {
  static onSwipeSFXPlaybackRateStep = 0.025;
  static propTypes = {
    treat: PropTypes.shape({
      rarityDescriptor: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      swiping: false,
      maxRotation: false,
      modalDismissed: false,
      swipeSFXPlaybackRate: 1,
      volume: 0.05
    };

    this.onSwipe = this.onSwipe.bind(this);
    this.onRewardUnlocked = this.onRewardUnlocked.bind(this);
    this.hideModal = this.hideModal.bind(this);

    const S3_BUCKET = 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/sound-effects';
    this.soundEffects = {
      whoosh: createAudio(`${S3_BUCKET}/whoosh-sound-effect.mp3`),
      reward: createAudio(`${S3_BUCKET}/reward-sound-effect.mp3`)
    };
  }
  hideModal() {
    this.setState({
      modalDismissed: true
    });
  }
  componentDidMount() {
    this.turnVolumeDown = window.setInterval(() => {
      this.setState({
        volume: Math.max(0, this.state.volume - 0.025)
      })
    }, 100);
  }
  componentWillUpdate() {
    this.soundEffects.whoosh.volume = this.state.volume;
  }
  onRewardUnlocked() {
    if (!this.state.maxRotation) {
      this.soundEffects.reward.play();
      this.setState({
        maxRotation: true
      });
    }
  }
  onSwipe(event) {
    event.preventDefault();
    this.soundEffects.whoosh.play();

    this.setState({
      swipeSFXPlaybackRate: this.state.swipeSFXPlaybackRate +
        GiftContainer.onSwipeSFXPlaybackRateStep,
      volume: Math.min(1, this.state.volume + 0.20)
    });
  }
  render() {
    const cubePhysics = {
      maxRotationSpeed: 0.8,
      swipeGravity: 0.002,
      passiveRotationY: -0.01,
      passiveRotationZ: 0.002
    };

    return (
      <div
        className="gift-3d-container"
      >
        {!this.state.modalDismissed && (<Gift3D
          physics={cubePhysics}
          onSwipe={this.onSwipe}
          onMaxRotationSpeed={this.onRewardUnlocked}
          pixelWidth={125}
          pixelHeight={125}
          {...this.props}
        />)}
        <Dialog open={this.state.maxRotation && !this.state.modalDismissed}>
          <DialogTitle>
            {this.props.treat.rarityDescriptor} Treat: {this.props.treat.title}
          </DialogTitle>
          <DialogContent>
            <div
              className="treat-featured-image"
              alt="Reward unlocked"
              style={{
                backgroundImage: `url(https://media-cdn.tripadvisor.com/media/photo-s/06/18/1a/1c/voxx-coffee.jpg)`
              }}
            />
            <DialogContentText>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.hideModal}>
              Save for later
            </Button>
            <Button raised={"true"} color="primary" onClick={this.hideModal}>
              Enjoy Now
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
