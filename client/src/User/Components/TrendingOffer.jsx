import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

//* carousel images: 
import opticalImg_1 from '../../assets/carousal1.webp';
import opticalImg_2 from '../../assets/carousal2.webp';
import opticalImg_3 from '../../assets/carousal3.webp';
import opticalImg_4 from '../../assets/carousal4.webp';
import opticalImg_5 from '../../assets/carousal5.webp';
import opticalImg_6 from '../../assets/carousal6.webp';
import opticalImg_7 from '../../assets/carousal7.webp';

const TrendingOffer = () => {
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

    // Adjust currentIndex for infinite loop
    useEffect(() => {
        if (!isTransitioning) {
            if (currentIndex === -1) {
                setCurrentIndex(images.length - 1);
            } else if (currentIndex === images.length) {
                setCurrentIndex(0);
            }
        }
    }, [isTransitioning, currentIndex, images.length]);

    const handleNextSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
    };

    const transitionStyle = {
        transform: `translateX(-${(currentIndex + 1) * 50}%)`,
        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
    };

    return (
        <div className="relative w-3/4 mx-auto mt-16 overflow-hidden rounded-2xl">
            <div className='flex justify-between items-center ml-10 ' > 
                <h1 className="text-4xl flex items-center mb-10 font-bold">Trending Offers</h1>
                <Link to='/special-offer' className='text-xl text-blue-600'> view &gt; </Link>
            </div>

            {/* Left Arrow */}
            <button
                className="absolute left-4 top-[57%] transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 text-3xl rounded-full z-10 flex items-center justify-center"
                onClick={handlePrevSlide}
            >
                &#10094;
            </button>

            {/* Carousel Container */}
            <div
                className="flex w-full gap-5 "
                style={transitionStyle}
                onTransitionEnd={handleTransitionEnd}
                ref={carouselRef}
            >
                {/* Add Last Image for Looping */}
                <div className="flex-shrink-0 w-[50%]">
                    <img
                        src={images[images.length - 1]}
                        alt="carousel"
                        className="w-full h-96 rounded-2xl object-cover"
                    />
                </div>

                {/* Main Images */}
                {images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-[50%]">
                        <img
                            src={image}
                            alt={`carousel-${index}`}
                            className="w-full h-96 rounded-2xl object-cover"
                        />
                    </div>
                ))}

                {/* Add First Image for Looping */}
                <div className="flex-shrink-0 w-[50%]">
                    <img
                        src={images[0]}
                        alt="carousel"
                        className="w-full h-96 rounded-2xl object-cover"
                    />
                </div>
            </div>

            {/* Right Arrow */}
            <button
                className="absolute right-4 top-[57%] transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 text-3xl rounded-full z-10 flex items-center justify-center"
                onClick={handleNextSlide}
            >
                &#10095;
            </button>
        </div>
    );
};

export default TrendingOffer;
