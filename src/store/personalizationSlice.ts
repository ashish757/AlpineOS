import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadWallpapers } from '../utils/loadWallpapers';

export interface Wallpaper {
    id: string;
    name: string;
    type: 'local' | 'url';
    url?: string;
}

interface personalizationState {
  currentWallpaper: Wallpaper;
  localWallpapers: Wallpaper[];
}

const localWallpapers = loadWallpapers();

const initialState: personalizationState = {

  currentWallpaper: localWallpapers[0],
  localWallpapers: localWallpapers,
};

export const personalizationSlice = createSlice({
  name: 'personalization',
  initialState,
  reducers: {
    setWallpaper: (state, action: PayloadAction<{type: string, id: string}>) => {
      const { type, id } = action.payload;
      if (type === 'local') {
        const wallpaper = state.localWallpapers.find(w => w.id === id);
        if (wallpaper) {
          state.currentWallpaper = wallpaper;
        }
      }
    },
  },
});

export const { setWallpaper } = personalizationSlice.actions;

export default personalizationSlice.reducer;