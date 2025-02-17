import {Storage} from '@ionic/storage';


let storageInstance: Storage | null = null;

const initializeStorage = async (): Promise<void> => {
    try {
        const storage = new Storage();
        await storage.create();
        storageInstance = storage;
    } catch (error) {
        console.error('Failed to initialize Ionic Storage:', error);
        throw error;
    }
};

const getStorage = (): Storage => {
    if( !storageInstance) {
        throw new Error('Ionic Storage has not been initialized. Call initializeStorage() in App.tsx first.');
    }
    return storageInstance;
};

export {initializeStorage, getStorage};



