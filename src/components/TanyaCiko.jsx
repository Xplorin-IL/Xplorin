// import bgTanya from "../assets/images/homeTanyaCikoAmpera.png";
import ciko from "../assets/images/homeMaskotCiko.png";
import { Link } from "react-router-dom";

const TanyaCiko = () => {
    return (
        <section className={`
            relative bg-[#8b0000] mx-6 md:mx-20 my-10 rounded-[1rem] md:rounded-[2rem] lg:rounded-[5rem] overflow-hidden bg-[url(/public/images/homeTanyaCikoAmpera.png)] bg-cover bg-bottom    
        `}>
        {/* Maskot Ciko */}
        <img
            src={ciko}
            alt="maskot-ciko"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-[15%] max-w-[100px] md:w-[15%] max-w-[300px] h-auto"
        />

        {/* CTA Text */}
        <div className="flex justify-center mt-[10vh] md:mt-[15vh] lg:mt-[20vh]">
            <div className="relative">
                <a
                className={`bg-white text-[#000000] font-bold text-base md:text-[2rem] px-8 py-4 rounded-full shadow-md text-center inline-block
                        sm:scale-[1] md:scale-[1.05] lg:scale-[1.3]
                    `}
                >
                Looking for Some Help?
                </a>
                
                {/* ekor chat */}
                <div
                className={`absolute -bottom-4 right-3 md:-bottom-7 lg:-bottom-12 lg:-right-12 -translate-x-1/2 w-0 h-0 
                            border-l-[25px] border-l-transparent 
                            border-r-[15px] border-r-transparent 
                            border-t-[20px] border-t-white

                            md:border-l-[40px] border-l-transparent 
                            md:border-r-[25px] border-r-transparent 
                            md:border-t-[29px] border-t-white

                            lg:border-l-[60px] lg:border-l-transparent 
                            lg:border-r-[30px] lg:border-r-transparent 
                            lg:border-t-[40px] lg:border-t-white
                        `}
                ></div>
            </div>
        </div>


        {/* CTA Button */}
        
        <Link to={"/assistant"}>
            <div className="flex justify-center mt-[10vh] md:mt-[40vh] mb-[10vh]">
                <button
            
                    className="border-2 md:border-4 border-[#ffbf00] text-[#ffbf00] font-base md:font-bold text-sm md:text-[1rem] px-4 py-1 md:px-6 md:py-2 rounded-full hover:bg-[#ffbf00] hover:text-white transition duration-300"
                >
                Ask Ciko Now
                </button>
            </div>
        </Link>
        </section>
    );
};

export default TanyaCiko;
