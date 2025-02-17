import React, { useState, useEffect, useRef } from 'react';

//* carousel images: 
import opticalImg_1 from '../../assets/carousal1.webp';
import opticalImg_2 from '../../assets/carousal2.webp';
import opticalImg_3 from '../../assets/carousal3.webp';
import opticalImg_4 from '../../assets/carousal4.webp';
import opticalImg_5 from '../../assets/carousal5.webp';
import opticalImg_6 from '../../assets/carousal6.webp';
import opticalImg_7 from '../../assets/carousal7.webp';

const Carousel = () => {
    
    const images = [
        opticalImg_1,
        opticalImg_2,
        opticalImg_3,
        opticalImg_4,
        opticalImg_5,
        opticalImg_6,
        opticalImg_7,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const carouselRef = useRef(null);

    const handleNextSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        const interval = setInterval(handleNextSlide, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentIndex === images.length) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 1000);
        } else if (currentIndex === -1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(images.length - 1);
            }, 1000);
        }
    }, [currentIndex, images.length]);

    const transitionStyle = {
        transform: `translateX(-${(currentIndex + 1) * 100}%)`,
        transition: isTransitioning ? 'transform 1.5s ease-in-out' : 'none',
    };

    return (
        <div className="relative w-[90%] mx-auto mt-16 overflow-hidden rounded-xl">
            {/* Left Arrow Button */}
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-black p-2 text-2xl rounded-full z-10"
                onClick={handlePrevSlide}
            >
                &#10094;
            </button>

            {/* Image Slider */}
            <div
                className="flex"
                style={transitionStyle}
                ref={carouselRef}
            >
                {/* Add the last image at the beginning for infinite loop */}
                <div className="flex-shrink-0 w-full">
                    <img
                        src={images[images.length - 1]}
                        alt="carousel"
                        className="w-full h-96 object-cover"
                    />
                </div>

                {/* Main images */}
                {images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-full">
                        <img
                            src={image}
                            alt={`carousel-${index}`}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                ))}

                {/* Add the first image at the end for infinite loop */}
                <div className="flex-shrink-0 w-full">
                    <img
                        src={images[0]}
                        alt="carousel"
                        className="w-full h-96 object-cover"
                    />
                </div>
            </div>

            {/* Right Arrow Button */}
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-black p-2 text-2xl rounded-full z-10"
                onClick={handleNextSlide}
            >
                &#10095;
            </button>
        </div> 
    );
};

export default Carousel;
