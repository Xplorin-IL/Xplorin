import React, { useState, useEffect } from "react";
import Animasi1 from "/images/Animation-1.png";
import Animasi2 from "/images/Animation-2.png";
import Animasi3 from "/images/Animation-3.png";

const foodData = [
    {
        title: "Our Favorite Dish #1",
        image: Animasi1,
        desc: `The superstar of Palembang food! Fish mixed with tapioca flour and eaten with cuko, a dark sweet-spicy vinegar sauce.`,
    },
    {
        title: "Our Favorite Dish #2",
        image: Animasi2,
        desc: `Palembang-style curry martabak: crispy outside, rich curry inside. Best eaten with pickled cucumber and chili sauce.`,
    },
    {
        title: "Our Favorite Dish #3",
        image: Animasi3,
        desc: `Palembang’s famous noodle dish. Thick egg noodles in a creamy coconut milk and shrimp broth, topped with bean sprouts, boiled egg, and fried shallots.`,
    },
    ];

    export default function CardSlider() {
    const [current, setCurrent] = useState(0);

    // Auto-slide setiap 4 detik
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % foodData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const food = foodData[current];

    return (
        <section className={`
            static  my-10  
            bg-[url(/images/Wave.png)] bg-cover bg-bottom w-[100%]
        `}>
        {/* Background wave atas */}

        {/* Konten utama */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-10 md:px-20">
            {/* Text Section */}
            <div className="sticky text-left bottom-500 right-500 text-shadow-lg/60">
            <h1 className="text-[#8b0000] text-2xl md:text-5xl font-bold leading-snug">
                {food.title.split(" ").slice(0, 2).join(" ")} <br />
                <span className="text-[#e1a800]">
                {food.title.split(" ").slice(2).join(" ")}
                </span>
            </h1>
            </div>

            {/* Image Section dengan label */}
            <div className="relative md:w-1/2 flex justify-center">
            <img
                src={food.image}
                alt={food.title}
                className="rounded-lg object-cover w-[250px] md:w-[400vw] md:-translate-x-40"
            />
            </div>
        </div>

        {/* Navigasi Dots */}
        <div className="flex justify-center gap-2 py-4">
            {foodData.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-1 h-1 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === current
                    ? "bg-[#FFFFFF] opacity-100"
                    : "bg-[#FFFFFF] opacity-70"
                }`}
            />
            ))}
        </div>

        {/* Deskripsi */}
        <p className="text-center text-[#e1a800] text-sm md:text-base max-w-2xl mx-auto pb-10 px-4 text-shadow-lg/40">
            {food.desc}
        </p>
        </section>
    );
}
