import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

interface VirtualFile {
    id: string,
    name: string,
    parentId: string,
    extension: string,
    content: string
}

interface VirtualFolder {
    id: string,
    name: string,
    parentId: string,
}

export interface FileSystemState {
    files: VirtualFile[],
    folders: VirtualFolder[],
}

const initialState: FileSystemState = {
    files: [],
    folders: [
        {
        id: 'root',
        name: '~',
        parentId: '',

        }

    ]
}

export const fileSystemSlice = createSlice({
    name: 'fs',
    initialState,
    reducers: {
        createFile: (state, action: PayloadAction<VirtualFile>) => {
            state.files.push(action.payload)
        },
        createFolder: (state, action: PayloadAction<VirtualFolder>) => {
            state.folders.push(action.payload)
        },
        deleteFile: (state, action: PayloadAction<VirtualFile>) => {
            state.files = state.files.filter(file => file.id != action.payload.id)
        },
        deleteFolder: (state, action: PayloadAction<VirtualFolder>) => {
            state.folders = state.folders.filter(folder => folder.id != action.payload.id)
            state.files = state.files.filter(file => file.parentId != action.payload.id)
        },

    }
})

export const { createFile, createFolder, deleteFile, deleteFolder } = fileSystemSlice.actions;

export default fileSystemSlice.reducer