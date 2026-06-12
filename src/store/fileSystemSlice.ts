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

export const initialState: FileSystemState = {
  files: [
    {
      id: 'f1',
      name: 'passwd',
      parentId: 'et',
      extension: '',
      content: 'root:x:0:0:root:/root:/bin/bash\nusr:x:1000:1000:usr:/home/usr:/bin/bash'
    },
    {
      id: 'f2',
      name: 'hosts',
      parentId: 'et',
      extension: '',
      content: '127.0.0.1 localhost'
    },
    {
      id: 'f3',
      name: 'profile',
      parentId: 'et',
      extension: '',
      content: 'export PATH=$PATH:/usr/local/bin'
    },
    {
      id: 'f4',
      name: '.bashrc',
      parentId: 'uh',
      extension: '',
      content: 'alias ll="ls -alF"\nalias update="sudo apt update"'
    },
    {
      id: 'f5',
      name: 'sysLog',
      parentId: 'lg',
      extension: 'log',
      content: 'sys boot ok\nnet init ok'
    },
    {
      id: 'f6',
      name: 'readme',
      parentId: 'dc',
      extension: 'md',
      content: '# sys init\nusr dir setup complete.'
    }
  ],
  folders: [
    { id: 'root', name: '/', parentId: '' },

     { id: 'app', name: 'Application', parentId: 'root' },
    { id: 'lib', name: 'Library', parentId: 'root' },
    { id: 'sys', name: 'System', parentId: 'root' },
    { id: 'lib2', name: 'Library', parentId: 'sys' },
    { id: 'vol', name: 'Volumnes', parentId: 'sys' },
    { id: 'usr', name: 'Users', parentId: 'root' },

    { id: 'sh', name: 'shared', parentId: 'usr' },
    { id: 'usrAcc', name: 'User', parentId: 'usr' },
    { id: 'desk', name: 'Desktop', parentId: 'usrAcc' },
    { id: 'dw', name: 'Downloads', parentId: 'usrAcc' },
    { id: 'dc', name: 'Documents', parentId: 'usrAcc' },
    { id: 'lib3', name: 'Library', parentId: 'usrAcc' },
    { id: 'mov', name: 'Movies', parentId: 'usrAcc' },
     { id: 'mus', name: 'Music', parentId: 'usrAcc' },
      { id: 'pub', name: 'Public', parentId: 'usrAcc' },
       { id: 'pic', name: 'Pictures', parentId: 'usrAcc' },



    { id: 'bn', name: 'bin', parentId: 'root' },
    { id: 'et', name: 'etc', parentId: 'root' },
    { id: 'hm', name: 'home', parentId: 'root' },
    { id: 'vr', name: 'var', parentId: 'root' },
    { id: 'op', name: 'opt', parentId: 'root' },
    { id: 'tm', name: 'tmp', parentId: 'root' },
    { id: 'lg', name: 'log', parentId: 'vr' },
    { id: 'uh', name: '~', parentId: 'hm' },
 
    { id: 'cf', name: '.config', parentId: 'uh' }
  ]
};

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
        updateFileContent: (state, action: PayloadAction<{id: string, content: string}>) => {
          const {id, content} =  action.payload;
          const file = state.files.find(file => file.id === id);
          if(file) {
            file.content = content;
          }
        },
        rename: (state, action: PayloadAction<{id: string, newName: string}>) => {
          const {id, newName} = action.payload;
          const file = state.files.find(file => file.id === id);
          if(file) {
            file.name = newName;
            return;
          }
          const folder = state.folders.find(folder => folder.id === id);
          if(folder) {
            folder.name = newName;
          } 
        }
      }
})

export const { createFile, createFolder, deleteFile, deleteFolder, updateFileContent, rename } = fileSystemSlice.actions;

export default fileSystemSlice.reducer