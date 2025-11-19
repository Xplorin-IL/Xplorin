import MaskotCiko from "../components/MaskotCiko"
import PopularFoodInPalembang from "../components/PopularFoodInPalembang"
import RestaurantList from "../components/RestaurantList"
import ExploreFoodGallery from "../components/ExploreFoodGallery"
import Footer from '../components/Footer';
import { useEffect } from "react";

function Explore(){

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 50); 
            }
        }
    }, []);

    return(
        <>
            <PopularFoodInPalembang />
            <section id="sectionRestaurant">
                <RestaurantList />
            </section>
            <section id="sectionFoodGallery">
                <ExploreFoodGallery />
            </section>
            <MaskotCiko />
            <Footer />
        </>
    )
}

export default Explore