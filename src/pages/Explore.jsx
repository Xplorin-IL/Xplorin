import MaskotCiko from "../components/MaskotCiko"
import PopularFoodInPalembang from "../components/PopularFoodInPalembang"
import RestaurantList from "../components/RestaurantList"


function Explore(){
    return(
        <>
            <PopularFoodInPalembang />
            <RestaurantList />
            <MaskotCiko />
        </>
    )
}

export default Explore