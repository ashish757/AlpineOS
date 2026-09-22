import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadWallpapers } from '../utils/loadWallpapers';

export interface Wallpaper {
    id: string;
    name: string;
    type: 'local' | 'url';
    url?: string;
}

export interface Widgets {
    id: string;
    type: "clock" | "calender" | "weather" | "telemetry";
    x: number;
    y: number;
}

interface settingsState {
    personalization: {
        theme: 'light' | 'dark';
        accentColor: string;
        currentWallpaper: Wallpaper;
        localWallpapers: Wallpaper[];
    };
    widgets: {
        activeWidgets: Widgets[] | [];
        allWidgets: Widgets[];
    }


}

const localWallpapers = loadWallpapers();

const initialState: settingsState = {
    personalization: {
        theme: 'light',
        accentColor: "#0078D4",
        currentWallpaper: localWallpapers[11],
        localWallpapers: localWallpapers,
    },
    widgets: {
        activeWidgets: [],
        allWidgets: [{id: '1', type: "clock", x:0,y:0}]

    }

};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setWallpaper: (state, action: PayloadAction<{type: string, id: string}>) => {
            const { type, id } = action.payload;
            if (type === 'local') {
                const wallpaper = state.personalization.localWallpapers.find(w => w.id === id);
                if (wallpaper) {
                    state.personalization.currentWallpaper = wallpaper;
                }
            }
        },
    },
});

export const { setWallpaper } = settingsSlice.actions;

export default settingsSlice.reducer;