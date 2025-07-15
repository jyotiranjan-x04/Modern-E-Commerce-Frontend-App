import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  darkMode?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ 
  images, 
  autoPlay = true, 
  interval = 5000,
  darkMode = false 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-lg hover:shadow-xl transition-shadow`}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={goToNext}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-lg hover:shadow-xl transition-shadow`}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-white'
                : darkMode ? 'bg-gray-600' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;