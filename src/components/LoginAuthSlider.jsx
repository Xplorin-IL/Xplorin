import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image1 from '/images/imageSlider1.png';
import Image2 from '/images/imageSlider2.png';
import Image3 from '/images/imageSlider3.png';

const sliderImages = [Image1, Image2, Image3];

export default function LoginAuthSlider() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-1/2 h-screen bg-gray-900 hidden lg:flex flex-col justify-between items-center overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-full flex justify-center items-center">
        <img
          src={sliderImages[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        {/* Red overlay */}
        <div className="absolute inset-0 bg-red-900/30"></div>
        {/* Gradient overlay untuk text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent h-1/3"></div>
      </div>

      {/* Text Section */}
      <div className="absolute top-24 left-8 right-12 text-white">
        <h1 className="text-3xl font-bold leading-tight">
          Savor the Flavor,<br />
          Discover the Culture
        </h1>
      </div>

      {/* Dots Navigation - Center Bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 items-center z-10">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? 'w-3 h-3 bg-yellow-400'
                : 'w-2 h-2 bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 bg-white/80 hover:bg-white text-red-900 rounded-full p-3 transition-all duration-300 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}
