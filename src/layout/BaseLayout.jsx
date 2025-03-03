import { Footer } from '@/components/Shared/Footer';
import { Header } from '@/components/Shared/Header';
import React from 'react';
import { Outlet } from 'react-router';

const BaseLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default BaseLayout;