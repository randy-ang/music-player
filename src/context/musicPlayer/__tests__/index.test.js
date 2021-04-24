import React from 'react';
import {mockMusicListResponse} from '../../../../__mocks__/musicList.mock';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {autoMockVolumeSettings} from '../../../../__mocks__/systemSettings.mock';
import {mockAudioSound} from '../../../../__mocks__/audio.mock';

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
    const {playMusic, currentTrackId} = useMusicPlayer();
    testCallback(playMusic, currentTrackId);
    return null;
  };
  const {default: MusicPlayerProvider, useMusicPlayer} = require('..');

  test('starting track id', async done => {
    const testCallback = (_, currentTrackId) => {
      expect(currentTrackId).not.toBeDefined();
      done();
    };
    render(
      <MusicPlayerProvider>
        <Children testCallback={testCallback} />
      </MusicPlayerProvider>,
    );
  });
});
