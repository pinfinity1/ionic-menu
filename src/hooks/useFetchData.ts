import {useEffect, useState} from 'react';
import api from '../config/api';


interface FetchOptions<T> {
    method: 'GET' | 'POST';
    endpoint: string;
    payload?: any;
}

const useFetchData = <T, > ({method, endpoint, payload}: FetchOptions<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    
    const fetchData = async () => {
        try {
            let response;
            if(method === 'GET') {
                response = await api.get(endpoint);
            } else if(method === 'POST') {
                response = await api.post(endpoint, payload);
            }
            setData(response!.data);
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [method, endpoint, JSON.stringify(payload)]);
    
    return {data, loading, error, refetch: fetchData};
};

export default useFetchData;