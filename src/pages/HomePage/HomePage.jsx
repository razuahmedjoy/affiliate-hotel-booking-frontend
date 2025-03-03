import { Features } from '@/components/Home/Feature';
import { Hero } from '@/components/Home/Hero';
import { Testimonials } from '@/components/Home/Testimonial';
import React from 'react';

const HomePage = () => {
    return (
        <>

            <Hero />
            <Features />
            <Testimonials />
        </>

    );
};

export default HomePage;