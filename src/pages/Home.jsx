import TanyaCiko from "../components/TanyaCiko";
import FoodGallery from "../components/FoodGallery";
import FamousRestaurant from "../components/FamousRestaurant";
import CardSlider from "../components/CardSlider";
import Footer from '../components/Footer';
import MaskotCiko from "../components/MaskotCiko";
import { Link } from "react-router-dom";

function Home(){
    return(<>
        {/* {Heading} */}   
            <div className="w-full relative">
                <div className="relative">
                    <img
                        className="w-[110%] object-cover"
                        src="/images/headline-image.png"
                        alt="Headline"
                    />
                    {/* Overlay gradasi */}
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-white to-white/10 pointer-events-none" />
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  text-center w-3/4 pt-45 md:pt-50 pb-20">
                    <Link to={"/explore"}>
                        <h1 className="text-right font-extrabold text-3xl md:text-5xl text-white leading-[1.2] hover:drop-shadow-[0_2px_4px_var(--primary-color)]">
                            Savor the Flavor,
                            <br/> Discover the
                            <br/> Culture</h1>
                    </Link>
                    <p className="text-center text-[var(--primary-color)] text-shadow-lg/20 text-[0.8rem] md:text-2xl font-medium mt-10">
                        Xplorin is your go-to destination for culinary exploration, bringin your closer to genuine local <br /> 
                        Taste and lively network of food enthusiasts</p>
                </div>
            </div>
        <CardSlider/>
        <TanyaCiko/>
        <FoodGallery/>
        <FamousRestaurant/>
        <Footer />
        <MaskotCiko />
    </>)
}

export default Home