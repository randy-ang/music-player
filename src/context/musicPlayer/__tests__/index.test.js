import React, {useEffect} from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {autoMockVolumeSettings} from '../../../../__mocks__/systemSettings.mock';
import {mockAudioSound} from '../../../../__mocks__/audio.mock';
import {mockMusicListResponse} from '../../../../__mocks__/musicList.mock';

autoMockVolumeSettings();
const mockSound = {
  playAsync: jest.fn(),
  setOnPlaybackStatusUpdate: jest.fn(),
  playFromPositionAsync: jest.fn(),
  pauseAsync: jest.fn(),
  unloadAsync: jest.fn(),
};
beforeEach(() => {
  for (const key in mockSound) {
    mockSound[key].mockClear();
  }
});
mockAudioSound({
  createAsync: jest.fn(() => Promise.resolve({sound: mockSound})),
});

describe('test music item', () => {
  const Children = ({testCallback}) => {
    const providerValues = useMusicPlayer();
    useEffect(() => {
      testCallback(providerValues);
      // if testCallback implements useCallback, it makes function not called, not using useCallback causes infinite loop
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
  };
  const {default: MusicPlayerProvider, useMusicPlayer} = require('..');

  test('starting track id', async done => {
    const testCallback = jest.fn();
    render(
      <MusicPlayerProvider>
        <Children testCallback={testCallback} />
      </MusicPlayerProvider>,
    );
    expect(testCallback.mock.calls[0][0]).toHaveProperty('currentTrackId');
    done();
  });

  describe('state change callbacks', () => {
    const musicList = mockMusicListResponse().results;
    test('setPlaylistAndPlay', async done => {
      const testCallback = ({setPlaylistAndPlay}) => {
        setPlaylistAndPlay(musicList, 0);
      };

      const {getByText} = render(
        <MusicPlayerProvider>
          <Children testCallback={testCallback} />
        </MusicPlayerProvider>,
      );

      await waitFor(() => {
        const {artistName, trackName} = musicList[0];
        expect(getByText(trackName)).toBeTruthy();
        expect(getByText(artistName)).toBeTruthy();
        done();
      });
    });

    test('clicking prev button', async () => {
      const testCallbackPrepopulate = ({setPlaylistAndPlay}) => {
        setPlaylistAndPlay(musicList, 0);
      };
      const {getByTestId, getByText, rerender} = render(
        <MusicPlayerProvider>
          <Children testCallback={testCallbackPrepopulate} />
        </MusicPlayerProvider>,
      );

      const prevIconBtn = getByTestId('prevBtn');
      fireEvent.press(prevIconBtn);

      const {artistName, trackName} = musicList[1];
      expect(getByText(trackName)).toBeTruthy();
      expect(getByText(artistName)).toBeTruthy();
    });

    test('clicking next button', async () => {
      const testCallbackPrepopulate = ({setPlaylistAndPlay}) => {
        setPlaylistAndPlay(musicList, 0);
      };
      const {getByTestId, getByText} = render(
        <MusicPlayerProvider>
          <Children testCallback={testCallbackPrepopulate} />
        </MusicPlayerProvider>,
      );

      const nextIconBtn = getByTestId('nextBtn');
      fireEvent.press(nextIconBtn);
      const {artistName, trackName} = musicList[1];
      expect(getByText(trackName)).toBeTruthy();
      expect(getByText(artistName)).toBeTruthy();

      fireEvent.press(nextIconBtn);
      const {
        artistName: artistNameAfter,
        trackName: trackNameAfter,
      } = musicList[0];
      expect(getByText(artistNameAfter)).toBeTruthy();
      expect(getByText(trackNameAfter)).toBeTruthy();
    });

    test('clicking pause/play button', async done => {
      const testCallbackPrepopulate = ({setPlaylistAndPlay, isPlaying}) => {
        setPlaylistAndPlay(musicList, 0);
      };
      const {getByTestId} = render(
        <MusicPlayerProvider>
          <Children testCallback={testCallbackPrepopulate} />
        </MusicPlayerProvider>,
      );

      const pausePlayIconBtn = getByTestId('pausePlayBtn');
      expect(pausePlayIconBtn).toBeTruthy();
      fireEvent.press(pausePlayIconBtn);
      done();
    });

    // test('pausePlay', () => {});
    // test('playNext', () => {});
    // test('playPrev', () => {});
  });
});
