import MaskotCiko from "../components/MaskotCiko"
import PopularFoodInPalembang from "../components/PopularFoodInPalembang"
import RestaurantList from "../components/RestaurantList"
import ExploreFoodGalery from "../components/ExploreFoodGalery"
import Footer from '../components/Footer';


function Explore(){
    return(
        <>
            <PopularFoodInPalembang />
            <RestaurantList />
            <ExploreFoodGalery />
            <MaskotCiko />
            <Footer />
        </>
    )
}

export default Explore