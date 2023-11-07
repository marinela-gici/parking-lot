import React from "react";
import background from '../assets/parking.jpg';

const HeroSection = () => {
    return (
        <>
            <div style={{backgroundImage: `url(${background})`}} className="relative min-h-[calc(100vh-80px)] bg-cover">
                <div className="w-full text-center absolute top-[50%] translate-y-[-50%]">
                  <p className="text-4xl md:text-6xl text-white font-bold">BOOK CAR PARKING SPACE</p>
                    <p className="text-3xl md:text-4xl text-white py-4">Safe and secure facilities for your vehicle!</p>
                    <button type="button" className="text-white border border-white hover:border-main hover:text-white hover:bg-main focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2">View map</button>
                </div>
            </div>
        </>
    )
}

export default HeroSection;