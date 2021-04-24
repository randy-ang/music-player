import React, {createContext, useCallback, useContext, useState} from 'react';

import noop from '../../utils/noop';
import MusicPlayer from './MusicPlayer';

export const MusicPlayerContext = createContext({
  playMusic: noop,
  currentTrackId: undefined,
});

const defaultOptions = {
  display: true,
  musicList: [],
  trackNo: undefined,
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export default function MusicPlayerProvider({children}) {
  const [{display, musicList, trackNo}, setMusicPlayerOptions] = useState(
    defaultOptions,
  );

  const musicInfo = musicList[trackNo] || {};

  const {trackId} = musicInfo;

  const playMusic = useCallback((newMusicList, trackIndex) => {
    setMusicPlayerOptions({
      display: true,
      musicList: newMusicList,
      trackNo: trackIndex,
    });
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
      };
    });
  }, []);

  const value = {playMusic, currentTrackId: trackId};

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <MusicPlayer
        display={display}
        musicInfo={musicInfo}
        onNext={playNext}
        onPrev={playPrev}
      />
    </MusicPlayerContext.Provider>
  );
}
