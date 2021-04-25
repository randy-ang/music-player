import {string, number, bool} from 'prop-types';
import {requireNativeComponent} from 'react-native';

/**
 * Composes `View`.
 *
 * - src: string
 * - start: boolean
 */
const AudioVisualizer = requireNativeComponent('AudioVisualizer');

AudioVisualizer.propTypes = {
  src: string.isRequired,
  density: number,
  gap: number,
  play: bool,
};

export default AudioVisualizer;
