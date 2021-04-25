import React, {createContext, useCallback, useContext, useState} from 'react';

import noop from '../../utils/noop';
import MusicPlayer from './MusicPlayer';

export const MusicPlayerContext = createContext({
  setPlaylistAndPlay: noop,
  currentTrackId: undefined,
});

const defaultOptions = {
  display: false,
  musicList: [],
  trackNo: undefined,
  isPlaying: false,
  /**
   * flag to determine whether audio will be played by this music player
   *
   * created because visualizers needed audio, so there is no point in having
   * two audio files being played at the same time.
   * other music state will work the same either way
   */
  parentPlay: false,
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export default function MusicPlayerProvider({children}) {
  const [
    {musicList, trackNo, ...musicPlayerOptions},
    setMusicPlayerOptions,
  ] = useState(defaultOptions);

  const {isPlaying} = musicPlayerOptions;

  const musicInfo = musicList[trackNo] || {};

  const {trackId} = musicInfo;

  const setPlaylistAndPlay = useCallback((newMusicList, trackIndex) => {
    setMusicPlayerOptions({
      display: true,
      musicList: newMusicList,
      trackNo: trackIndex,
      isPlaying: true,
    });
  }, []);

  const setIsPlaying = useCallback(newPlayingState => {
    setMusicPlayerOptions(musicOptions => ({
      ...musicOptions,
      isPlaying: newPlayingState,
    }));
  }, []);

  const pausePlay = useCallback(() => {
    setMusicPlayerOptions(({isPlaying: playingState, ...musicOptions}) => ({
      ...musicOptions,
      isPlaying: !playingState,
    }));
  }, []);

  const playNext = useCallback(() => {
    setMusicPlayerOptions(({trackNo: currTrackNo, ...musicOptions}) => {
      const {musicList: currMusicList} = musicOptions;
      // if at the end of the list, we start from 0
      let newTrackNo = currTrackNo + 1;
      if (newTrackNo >= currMusicList.length) {
        newTrackNo = 0;
      }
      return {
        ...musicOptions,
        trackNo: newTrackNo,
        isPlaying: true,
      };
    });
  }, []);

  const playPrev = useCallback(() => {
    setMusicPlayerOptions(({trackNo: currTrackNo, ...musicOptions}) => {
      const {musicList: currMusicList} = musicOptions;
      // if at the end of the list, we start from 0
      let newTrackNo = currTrackNo - 1;
      if (newTrackNo < 0) {
        newTrackNo = currMusicList.length - 1;
      }
      return {
        ...musicOptions,
        trackNo: newTrackNo,
        isPlaying: true,
      };
    });
  }, []);

  const value = {setPlaylistAndPlay, currentTrackId: trackId, isPlaying};
  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <MusicPlayer
        {...musicPlayerOptions}
        musicInfo={musicInfo}
        onNext={playNext}
        onPrev={playPrev}
        pausePlay={pausePlay}
        setIsPlaying={setIsPlaying}
      />
    </MusicPlayerContext.Provider>
  );
}
