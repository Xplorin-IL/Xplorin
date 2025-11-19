import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import { RESTAURANT_DATA, ReviewBackground } from '../data/RestaurantData'; 

const DetailRestaurant = () => {
    const { restaurantSlug } = useParams();
    const data = RESTAURANT_DATA[restaurantSlug];
    if (!data) {
        return <Navigate to="/explore" replace />; 
    }

    const { 
        title, subtitle, time, description, address, mapsLink, 
        image, socials, menu 
    } = data;

    return (
        <div 
            className="min-h-screen font-sans bg-fixed"
            style={{ 
                backgroundImage: `url(${ReviewBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="relative min-h-screen"> 
                <div className="absolute inset-0 bg-white opacity-80 z-0"></div>
                <main className="mt-32 pb-16 relative z-10">
                    <div className="container mx-auto px-4">
                        <p className="text-gray-500 mb-2">{subtitle}</p>

                        <h3 className="text-5xl md:text-7xl font-black text-[var(--primary-color)] ">
                            {title.split(' ').map((word, index) => (
                                <React.Fragment key={index}>
                                    {word} {index === 0 && <br />}
                                </React.Fragment>
                            ))}
                        </h3>
                        
                        <div className="flex items-center space-x-4 mt-4 mb-4">
                            <div className="flex items-center space-x-1 text-gray-600">
                                <FaClock className="text-lg text-[var(--secondary-color)]" />
                                <span className="text-lg font-bold">{time}</span>
                            </div>
                            <div className="flex space-x-4">
                                {socials.instagram && <a href={socials.instagram} className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"><FaInstagram /></a>}
                                {socials.whatsapp && <a href={socials.whatsapp} className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"><FaWhatsapp /></a>}
                                {socials.facebook && <a href={socials.facebook} className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"><FaFacebookF /></a>}
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
                            
                            <div className="lg:w-1/2 mt-6"> 
                                <p className="text-lg text-gray-700 mb-8 max-w-lg">
                                    {description}
                                </p>
                            </div>
                            
                            <div className="lg:w-1/2 flex flex-col space-y-2 lg:mt-[-13rem] items-center lg:items-end"> 
                                
                                <div className="relative w-full max-w-xl"> 
                                    <img src={image} alt={title} className="w-full h-auto object-cover"/>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg py-4 px-6 flex items-start space-x-4 border-l-4 border-[var(--primary-color)] w-full max-w-xl">
                                    <FaMapMarkerAlt className="text-3xl text-[var(--primary-color)] mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-800 font-semibold">
                                            {address}
                                        </p>
                                        <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--primary-color)] hover:underline">
                                            Lihat di Google Maps
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="relative mt-20 clear-both"> 
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[var(--primary-color)] text-white font-bold px-8 py-2 rounded-lg shadow-lg">
                                MENU
                            </div>
                            
                            <div className="bg-white border-2 border-[var(--primary-color)] rounded-xl shadow-2xl p-6 pt-10">
                                <div className="flex flex-col sm:flex-row justify-around">
                                    <div className="sm:w-1/2 px-2">
                                        {menu.left.map((item, index) => (
                                            <div key={index} className="flex justify-between items-end border-b border-dashed border-gray-300 py-3">
                                                <span className="font-medium text-gray-800">{item.item}</span>
                                                <span className="text-[var(--primary-color)] font-semibold">{item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="sm:w-1/2 px-2 mt-4 sm:mt-0">
                                        {menu.right.map((item, index) => (
                                            <div key={index} className="flex justify-between items-end border-b border-dashed border-gray-300 py-3">
                                                <span className="font-medium text-gray-800">{item.item}</span>
                                                <span className="text-[var(--primary-color)] font-semibold">{item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DetailRestaurant;