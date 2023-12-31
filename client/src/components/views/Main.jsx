import React from "react";
import HeroSection from "../HeroSection.jsx";
import ViewMap from "../ViewMap.jsx";
import Faq from "../Faq.jsx";
import Footer from "../Footer.jsx";
import UserForms from '../UserForms.jsx'

const Main = () => {
    return (
        <>
            <HeroSection />
          <p className="text-5xl my-8 text-center font-bold">All parking lots</p>
            <ViewMap />
            <Faq />
            <Footer />
        </>
    )
}

export default Main;