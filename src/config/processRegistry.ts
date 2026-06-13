export interface ProcessConfig {
    id: string;
    icon: string;
    reqWindow: boolean;
    title: string;
    componentId: string;
}

export type ProcessRegistry = { [key: string]: ProcessConfig };


export const processRegistry: ProcessRegistry = {
    finder : {
        id: 'finder',
        icon: '/icons/finder.png',
        reqWindow: true,
        title: 'Finder',
        componentId: 'FINDER_APP',
    },
    terminal: {
        id: 'terminal',
        icon: '/icons/terminal.png', 
        reqWindow: true,
        title: 'Terminal',
        componentId: 'TERMINAL_APP',
    },
    textpad: {
        id: 'textpad',
        icon: '/icons/textpad.png',
        reqWindow: true,
        title: 'Textpad',
        componentId: 'TEXTPAD_APP',
    },
    browser: {
        id: 'browser',
        icon: '/icons/browser.png',
        reqWindow: true,
        title: 'Browser',
        componentId: 'BROWSER_APP',
    },
    saveDialog: {
        id: 'saveDialog',
        icon: '/icons/savedialog.png',
        reqWindow: true,
        title: 'Save File',
        componentId: 'SAVE_DIALOG_APP',
    },
    activityManager: {
        id: 'activityManager',
        icon: '/icons/activitymanager.png',
        reqWindow: true,
        title: 'Activity Manager',
        componentId: 'ACTIVITY_MANAGER_APP',
    },
    personalization: {
        id: 'personalization',
        icon: '/icons/personalization.png',
        reqWindow: true,
        title: 'Personalization',
        componentId: 'PERSONALIZATION_APP',
    }
   
}