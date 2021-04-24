import React from 'react';
import {mockMusicListResponse} from '../../../../__mocks__/musicList.mock';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {autoMockVolumeSettings} from '../../../../__mocks__/systemSettings.mock';

autoMockVolumeSettings();
describe('test music item', () => {
  const {default: MusicListScreen} = require('..');
  const mockedMusicItemResponse = mockMusicListResponse();
  beforeAll(() => {
    global._fetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedMusicItemResponse),
      }),
    );
  });

  afterAll(() => {
    global.fetch = global._fetch;
  });

  test('searching should be triggered on blur', async () => {
    const {getByTestId, getAllByText} = render(<MusicListScreen />);
    const searchBar = getByTestId('searchBar');
    fireEvent.changeText(searchBar, 'new text');
    fireEvent(searchBar, 'blur');
    await waitFor(() => {
      mockedMusicItemResponse.results.forEach(
        ({artistName, collectionName, trackName}) => {
          expect(getAllByText(trackName)).toBeTruthy();
          expect(getAllByText(collectionName)).toBeTruthy();
          expect(getAllByText(artistName)).toBeTruthy();
        },
      );
    });
  });
});
