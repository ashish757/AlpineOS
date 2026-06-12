import {createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface FinderState {
    history: string[],
    folderId: string,
    position: number,
    selectedIds: string[],
}

const initialState: FinderState = {
    history: ['root'],
    folderId: 'root',
    position: 0,
    selectedIds: [],
}

export const finderSlice = createSlice({
    name: 'finder',
    initialState,
    reducers: {
        openFolder: (state, action: PayloadAction<string>) => {
            state.history = state.history.slice(0, state.position + 1)
            state.history.push(action.payload)
            state.position  = state.history.length - 1
            state.folderId = action.payload
            state.selectedIds = []
        },
        navigateBack: (state) => {
            if(state.position > 0) {
                state.position--;
                state.folderId = state.history[state.position]
                state.selectedIds = [];
            }
        },
        navigateForward: (state) => {
            if(state.position < state.history.length - 1) {
                state.position++;
                state.folderId = state.history[state.position]
                state.selectedIds = [];
            }
        },
        selectItems: (state, action: PayloadAction<string[]>) => {
            state.selectedIds = action.payload
        }

    }
})

export const { openFolder, navigateBack, navigateForward, selectItems  } = finderSlice.actions;

export default finderSlice.reducer