import {useCallback, useEffect, useState} from "react";
import {useStorageContext} from "../contexts/StorageContext";


interface UseAccessToken {
    accessToken: string | null;
    loading: boolean;
    saveToken: (token: string) => Promise<void>;
    removeToken: () => Promise<void>;
}

const useAccessToken = (): UseAccessToken => {
    const {storage, isStorageInitialized} = useStorageContext();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const loadToken = async () => {
            if(isStorageInitialized && storage) {
                try {
                    const token = await storage.get('access_token') || null;
                    setAccessToken(token);
                } catch (error) {
                    console.error('Failed to load access token:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        
        loadToken();
    }, [storage, isStorageInitialized]);
    
    const saveToken = useCallback(async (token: string) => {
        if(isStorageInitialized && storage) {
            try {
                await storage.set('access_token', token);
                setAccessToken(token);
            } catch (error) {
                console.error('Failed to save access token:', error);
            }
        } else {
            console.error('Storage not initialized, cannot save token.');
        }
    }, [storage, isStorageInitialized]);
    
    const removeToken = useCallback(async () => {
        if(isStorageInitialized && storage) {
            try {
                await storage.remove('access_token');
                setAccessToken(null);
            } catch (error) {
                console.error('Failed to remove access token:', error);
            }
        } else {
            console.error('Storage not initialized, cannot remove token.');
        }
    }, [storage, isStorageInitialized]);
    
    return {
        accessToken,
        loading,
        saveToken,
        removeToken,
    };
};

export default useAccessToken;

