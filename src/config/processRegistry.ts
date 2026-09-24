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
        icon: '/assets/icons/folder.png',
        reqWindow: true,
        title: 'Finder',
        componentId: 'FINDER_APP',
    },
    terminal: {
        id: 'terminal',
        icon: '/assets/icons/terminal.png',
        reqWindow: true,
        title: 'Terminal',
        componentId: 'TERMINAL_APP',
    },
    textpad: {
        id: 'textpad',
        icon: '/assets/icons/document.png',
        reqWindow: true,
        title: 'Textpad',
        componentId: 'TEXTPAD_APP',
    },
    browser: {
        id: 'browser',
        icon: '/assets/icons/browser.png',
        reqWindow: true,
        title: 'Browser',
        componentId: 'BROWSER_APP',
    },
    saveDialog: {
        id: 'saveDialog',
        icon: '/assets/icons/savedialog.png',
        reqWindow: true,
        title: 'Save File',
        componentId: 'SAVE_DIALOG_APP',
    },
    activityManager: {
        id: 'activityManager',
        icon: '/assets/icons/activitymanager.png',
        reqWindow: true,
        title: 'Activity Manager',
        componentId: 'ACTIVITY_MANAGER_APP',
    },
    settings: {
        id: 'settings',
        icon: '/assets/icons/settings.png',
        reqWindow: true,
        title: 'Settings',
        componentId: 'SETTINGS_APP',
    }
   
}