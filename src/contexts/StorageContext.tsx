import React, {createContext, useContext, useEffect, useState} from 'react';
import {Storage} from '@ionic/storage';


interface StorageContextProps {
    storage: Storage | null;
    isStorageInitialized: boolean;
}

const StorageContext = createContext<StorageContextProps>({
    storage: null,
    isStorageInitialized: false,
});

export const useStorageContext = () => useContext(StorageContext);

interface StorageProviderProps {
    children: React.ReactNode;
}

export const StorageProvider: React.FC<StorageProviderProps> = ({children}) => {
    const [storage, setStorage] = useState<Storage | null>(null);
    const [isStorageInitialized, setIsStorageInitialized] = useState<boolean>(false);
    
    useEffect(() => {
        const initializeStorage = async () => {
            try {
                const newStorage = new Storage();
                await newStorage.create();
                setStorage(newStorage);
                setIsStorageInitialized(true);
            } catch (error) {
                console.error('Failed to initialize storage', error);
            }
        };
        
        initializeStorage();
    }, []);
    
    return (
        <StorageContext.Provider value={{storage, isStorageInitialized}}>
            {children}
        </StorageContext.Provider>
    );
};
