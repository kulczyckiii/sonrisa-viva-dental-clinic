import React from 'react';
import Hero from '../components/home/Hero';
import WhyUs from '../components/home/WhyUs';
import Services from '../components/home/Services';
import Doctors from '../components/home/Doctors';
import FAQ from '../components/home/FAQ';
import ContactForm from '../components/home/ContactForm';

const Home = () => {
    return (
        <div className="animate-fade-in">
            <Hero />
            <WhyUs />
            <Services />
            <Doctors />
            <FAQ />
            <ContactForm />
        </div>
    );
};

export default Home;