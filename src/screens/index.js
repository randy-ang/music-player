import FavoritesScreen from './FavoritesScreen';
import MusicListScreen from './MusicListScreen';

export const MUSIC_LIST_SCREEN = 'MusicList';
export const FAVORITES_SCREEN = 'Favorites';

export const SCREENS = [
  {
    name: MUSIC_LIST_SCREEN,
    component: MusicListScreen,
  },
  {
    name: FAVORITES_SCREEN,
    component: FavoritesScreen,
  },
];
