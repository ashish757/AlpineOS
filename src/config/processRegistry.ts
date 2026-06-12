import {FinderApp} from '../apps/FinderApp';
import type { Process } from '../store/processSlice';


export type ProcessRegistry = { [key: string]: Process };


export const processRegistry: ProcessRegistry = {
    finder : {
        id: 'finder',
        isRunning: false,
        icon: '/icons/finder.png',
        reqWindow: true,
        windowInfo: {
            id: 'finder-window',
            component: FinderApp,
            title: 'Finder',
        }
    },
    // future apps can be registered here
}