import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {StorageProvider} from "./contexts/StorageContext";


const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <StorageProvider>
                <App/>
            </StorageProvider>
        </QueryClientProvider>
    </React.StrictMode>
);