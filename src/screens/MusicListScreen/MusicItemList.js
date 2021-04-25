import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioVisualizer from '../../../package/AudioVisualizer';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    justifyContent: 'space-between',
  },
  logo: {},
  descriptionWrapper: {
    flexDirection: 'column',
    paddingLeft: 16,
  },
  playingText: {
    color: 'green',
  },
  defaultText: {
    color: 'black',
  },
  waveformContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  waveform: {
    height: 8,
    width: 32,
  },
  hidden: {
    display: 'none',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal (64) * 2 (info & visualizer) + 32 (visualizer width)
    maxWidth: windowWidth - 64 - 96,
  },
});

// TODO: adaptive image
export default function Music({
  index,
  item: {artistName, artworkUrl60, collectionName, trackName, previewUrl},
  playMusic,
  isPlaying,
  playingState,
  hasPermission,
}) {
  return (
    <TouchableOpacity
      style={[styles.sectionContainer, isPlaying && styles.playingContainer]}
      onPress={() => playMusic(index)}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: artworkUrl60,
          }}
          height={48}
          width={48}
        />
        <View style={styles.descriptionWrapper}>
          <Text style={[styles.defaultText, isPlaying && styles.playingText]}>
            {trackName}
          </Text>
          <Text style={styles.defaultText}>{artistName}</Text>
          <Text style={styles.defaultText}>{collectionName}</Text>
        </View>
      </View>
      <View>
        {hasPermission && isPlaying && (
          <AudioVisualizer
            style={styles.waveform}
            src={previewUrl}
            play={playingState}
            // density={100}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
