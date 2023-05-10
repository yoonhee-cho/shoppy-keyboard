import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { ProvideAuthContext } from '../context/AuthContext';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

export default function Home() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ProvideAuthContext>
                <Header />
                <Outlet />
            </ProvideAuthContext>
        </QueryClientProvider>
    );
}

