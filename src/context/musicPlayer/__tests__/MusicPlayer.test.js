import React from 'react';
import {mockMusicListResponse} from '../../../../__mocks__/musicList.mock';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {autoMockVolumeSettings} from '../../../../__mocks__/systemSettings.mock';
import {mockAudioSound} from '../../../../__mocks__/audio.mock';

autoMockVolumeSettings();
mockAudioSound({
  createAsync: jest.fn(() => Promise.resolve({})),
});

describe('test music item', () => {
  const {
    Audio: {
      Sound: {createAsync},
    },
  } = require('expo-av');
  const {default: MusicPlayer} = require('../MusicPlayer');
  const musicInfo = mockMusicListResponse().results[0];
  const onPrev = jest.fn();
  const onNext = jest.fn();
  const defaultFnProps = {
    onPrev,
    onNext,
  };

  const defaultProps = {
    ...defaultFnProps,
    musicInfo,
    display: true,
  };

  beforeAll(() => {
    for (const key in defaultFnProps) {
      defaultFnProps[key].mockClear();
    }
  });

  it('should display artist name & song name', async () => {
    const {getByText} = render(<MusicPlayer {...defaultProps} />);
    const {artistName, trackName} = musicInfo;
    await waitFor(() => {
      expect(getByText(trackName)).toBeTruthy();
      expect(getByText(artistName)).toBeTruthy();
    });
  });

  describe('music playing behaviour', () => {
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
    createAsync.mockImplementation(() => Promise.resolve({sound: mockSound}));
    it('should play once sound can be produced', async () => {
      render(<MusicPlayer {...defaultProps} />);
      await waitFor(() => {
        expect(mockSound.playAsync).toHaveBeenCalled();
      });
    });

    test('clicking prev button', async () => {
      const {getByTestId} = render(<MusicPlayer {...defaultProps} />);
      await waitFor(() => {
        const prevIconBtn = getByTestId('prevBtn');
        fireEvent.press(prevIconBtn);
        expect(onPrev).toHaveBeenCalled();
      });
    });

    test('clicking next button', async () => {
      const {getByTestId} = render(<MusicPlayer {...defaultProps} />);
      await waitFor(() => {
        const nextIconBtn = getByTestId('nextBtn');
        fireEvent.press(nextIconBtn);
        expect(onNext).toHaveBeenCalled();
      });
    });

    test('clicking pause/play button', async () => {
      const {getByTestId} = render(<MusicPlayer {...defaultProps} />);
      await waitFor(() => {
        const pausePlayIconBtn = getByTestId('pausePlayBtn');
        fireEvent.press(pausePlayIconBtn);
        expect(mockSound.pauseAsync).toHaveBeenCalled();
      });

      await waitFor(() => {
        const pausePlayIconBtn = getByTestId('pausePlayBtn');
        fireEvent.press(pausePlayIconBtn);
        expect(mockSound.playAsync).toHaveBeenCalledTimes(2);
      });
    });
  });
});
