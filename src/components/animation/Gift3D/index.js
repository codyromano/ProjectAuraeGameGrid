import React from 'react';
import PropTypes from 'prop-types';
import touchwipe from 'vanilla-touchwipe';
import {
  PerspectiveCamera,
  Scene,
  Color,
  WebGLRenderer,
  TextureLoader,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';

export default class Gift3D extends React.Component {
  static defaultProps = {
    onMaxRotationSpeed: () => {},
    onSwipe: () => {},
    pixelWidth: 250,
    pixelHeight: 250,
    interaction: {
      minSwipeThreshold: 0.002
    },
    // Be careful tweaking the physics. It's possible
    // to break WebGL by choosing invalid parameters, and this
    // component cannot account for all permutations of settings.
    physics: {
      maxRotationSpeed: 1.5,
      swipeGravity: 0.002,
      passiveRotationY: -0.01,
      passiveRotationZ: 0.001
    },
    sound: {
      minSwipeSoundEffectSpeed: 1,
      maxSwipeSoundEffectMultiplier: 5
    },
    backgroundColor: 0xffffff,
    textureSrc: 'https://thumbs.dreamstime.com/b/red-ribbon-bow-over-shiny-ice-blue-texture-holidays-gift-card-concept-background-63133546.jpg'
  };
  static propTypes = {
    onMaxRotationSpeed: PropTypes.func,
    onSwipe: PropTypes.func,

    pixelWidth: PropTypes.number,
    pixelHeight: PropTypes.number,
    textureSrc: PropTypes.string,

    interaction: PropTypes.shape({
      minSwipeThreshold: PropTypes.number.isRequired
    }),
    physics: PropTypes.shape({
      maxRotationSpeed: PropTypes.number.isRequired,
      swipeGravity: PropTypes.number.isRequired,
      passiveRotationY: PropTypes.number.isRequired,
      passiveRotationZ: PropTypes.number.isRequired
    }),
    sound: PropTypes.shape({
      minSwipeSoundEffectSpeed: PropTypes.number.isRequired,
      maxSwipeSoundEffectMultiplier: PropTypes.number.isRequired
    })
  };
  constructor(props) {
    super(props);

    this.animate = this.animate.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);

    this.swipeDirection = 0.1;
    this.unmounted = false;
  }
  createAnimationContext() {
    this.camera = new PerspectiveCamera(
      70, this.props.pixelWidth / this.props.pixelHeight, 1, 1000);
    this.camera.position.z = 100;

    this.scene = new Scene();
    this.scene.background = new Color(this.props.backgroundColor);

    this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(this.props.pixelWidth, this.props.pixelHeight);

    this.el.appendChild(this.renderer.domElement);
  }
  createGiftModel() {
    const texture = new TextureLoader().load(this.props.textureSrc);
    const geometry = new BoxBufferGeometry( 125, 125, 125 );
    const material = new MeshBasicMaterial( { map: texture } );

    this.mesh = new Mesh(geometry, material);
    this.mesh.position.z = -150;
    this.scene.add(this.mesh);
  }
  onSwipeLeft(event) {
    this.props.onSwipe(event);
    this.swipeDirection -= 0.1;
  }
  onSwipeRight(event) {
    this.props.onSwipe(event);
    this.swipeDirection += 0.1;
  }

  animate() {
    const { maxRotationSpeed } = this.props.physics;
    const { swipeGravity, passiveRotationY, passiveRotationZ } = this.props.physics;
    const { minSwipeThreshold } = this.props.interaction;

    this.mesh.rotation.y += this.swipeDirection;
    this.mesh.rotation.z += passiveRotationZ;

    if (this.swipeDirection > 0 && this.swipeDirection < minSwipeThreshold) {
      this.swipeDirection += passiveRotationY;

    } else if (this.swipeDirection < 0) {
      this.swipeDirection += swipeGravity;
    } else if (this.swipeDirection > 0) {
      this.swipeDirection -= swipeGravity;
    }

    if (Math.abs(this.swipeDirection) >= maxRotationSpeed) {
      this.shouldShrink = true;
    }
    if (this.shouldShrink && !this.didShrink) {
      this.mesh.position.z -= 10;

      if (this.mesh.position.z < -1000) {
        this.props.onMaxRotationSpeed();
        this.didShrink = true;
      }
    }
    this.renderer.render(this.scene, this.camera);

    if (this.unmounted) {
      window.cancelAnimationFrame(this.repeatAnimation);
    } else {
      this.repeatAnimation = window.requestAnimationFrame(this.animate);
    }
  }
  componentDidMount() {
    this.createAnimationContext();
    this.createGiftModel();
    this.animate();

    this.touch = touchwipe(this.el, {
      wipeLeft: this.onSwipeLeft,
      wipeRight: this.onSwipeRight,
      preventDefaultEvents: true
    });
  }
  componentWillUnmount() {
    this.touch.unbind();
    this.unmounted = true;
  }
  render() {
    return (
      <div
        onClick={this.onSwipeLeft}
        ref={(el) => { this.el = el; }}
      />
    );
  }
}
