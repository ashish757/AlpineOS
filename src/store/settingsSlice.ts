import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadWallpapers } from '../utils/loadWallpapers';

export interface Wallpaper {
    id: string;
    name: string;
    type: 'local' | 'url';
    url?: string;
}

export interface Widget {
    id: string;
    type: "clock" | "calendar" | "weather" | "telemetry";
    x: number;
    y: number;
}

interface settingsState {
    personalization: {
        theme: 'light' | 'dark';
        accentColor: string;
        currentWallpaper: Wallpaper;
        localWallpapers: Wallpaper[];
        hideDock: boolean;
        brightness: number;
        isLaunchpadOpen: boolean;
    };
    widgets: {
        active: Widget[] | [];
    }

}

const localWallpapers = loadWallpapers();



const initialState: settingsState = {
    personalization: {
        theme: 'light',
        accentColor: "#0078D4",
        currentWallpaper: localWallpapers[11],
        localWallpapers: localWallpapers,
        hideDock: false,
        brightness: 100,
        isLaunchpadOpen: false,
    },
    widgets: {
        active: [{id:"as", type: "clock", x:2, y:1}],
    }

};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setWallpaper: (state, action: PayloadAction<{ type: string, id: string }>) => {
            const {type, id} = action.payload;
            if (type === 'local') {
                const wallpaper = state.personalization.localWallpapers.find(w => w.id === id);
                if (wallpaper) {
                    state.personalization.currentWallpaper = wallpaper;
                }
            }
        },
        addWidget: (state, action: PayloadAction<Widget>) => {
            state.widgets.active = [...state.widgets.active, action.payload]
        },
        removeWidget: (state, action: PayloadAction<string>) => {
            state.widgets.active = state.widgets.active.filter(w => w.id !== action.payload);
        },
        updateWidgetPosition: (state, action: PayloadAction<{ id: string, x: number, y: number }>) => {
            const widget = state.widgets.active.find(w => w.id === action.payload.id);
            if (widget) {
                widget.x = action.payload.x;
                widget.y = action.payload.y;
            }
        },
        toggleDockVisibility: (state) => {
            state.personalization.hideDock = !state.personalization.hideDock;
        },
        setBrightness: (state, action: PayloadAction<number>) => {
            state.personalization.brightness = action.payload;
        },
        toggleLaunchPad: (state) => {
            state.personalization.isLaunchpadOpen = !state.personalization.isLaunchpadOpen;
        }
    }
});

export const { setWallpaper, addWidget, removeWidget, updateWidgetPosition, toggleDockVisibility, setBrightness, toggleLaunchPad } = settingsSlice.actions;

export default settingsSlice.reducer;


