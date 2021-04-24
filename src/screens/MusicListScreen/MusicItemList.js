import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
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
});

// TODO: adaptive image
export default function Music({
  index,
  item: {artistName, artworkUrl60, collectionName, trackName},
  playMusic,
  isPlaying,
}) {
  return (
    <TouchableOpacity
      style={[styles.sectionContainer, isPlaying && styles.playingContainer]}
      onPress={() => playMusic(index)}>
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
    </TouchableOpacity>
  );
}
