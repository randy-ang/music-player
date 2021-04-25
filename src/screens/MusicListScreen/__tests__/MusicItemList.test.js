import React from 'react';
import {mockMusicListResponse} from '../../../../__mocks__/musicList.mock';
import {render} from '@testing-library/react-native';

describe('test music item', () => {
  const {default: MusicItemList} = require('../MusicItemList');
  const [mockedMusicItem] = mockMusicListResponse().results;
  it('should render artist name, song name & album name', () => {
    const {getByText} = render(<MusicItemList item={mockedMusicItem} />);
    const {artistName, collectionName, trackName} = mockedMusicItem;
    expect(getByText(trackName)).toBeTruthy();
    expect(getByText(collectionName)).toBeTruthy();
    expect(getByText(artistName)).toBeTruthy();
  });
});
