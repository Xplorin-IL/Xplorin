import Card from '../components/Card';
import Flamboyant from "../assets/images/exploreRestaurant_Flamboyant.png";
import PondokPindangUmak from "../assets/images/exploreRestaurant_PondokPindangUmak.png";
import MartabakHar from "../assets/images/exploreRestaurant_MartabakHar.png";
import MieCelorSyafei from "../assets/images/exploreRestaurant_MieCelor16Ilir.png";
import RiverSide from "../assets/images/exploreRestaurant_RiverSide.png";
import KampungPempek from "../assets/images/exploreRestaurant_KampungPempek26Ilir.png";
import MegaCakes from "../assets/images/exploreRestaurant_MegaCakeSukabangun.png";
import PempekCandy from "../assets/images/exploreRestaurant_PempekCandy.png";
import TokoHarum from "../assets/images/exploreRestaurant_Harum.png";

const Restoran = [
    { path:"/explore",img: Flamboyant, title: "Flamboyant", width: "28vw", height: "auto", hover: "hover:bg-white", text: "hover:text-[var(--primary-color)]",},
    { path:"/explore", img: PondokPindangUmak, title: "Pondok Pindang Umak", width: "28vw", height: "auto", hover: "hover:bg-white", text: "hover:text-[var(--primary-color)]",},
    { path:"/explore", img: MartabakHar, title: "Martabak Har", width: "28vw", height: "auto", hover: "hover:bg-white", text: "hover:text-[var(--primary-color)]",},
    { path:"/explore", img: MieCelorSyafei, title: "Mie Celor H. Syafei 26 Ilir", width: "28vw", height: "auto", hover: "hover:bg-white", text: "hover:text-[var(--primary-color)]",},
    { path:"/explore", img: RiverSide, title: "River Side", width: "28vw", height: "auto", hover: "hover:bg-white", text: "hover:text-[var(--primary-color)]",},
    { path:"/explore", img: KampungPempek, title: "Kampung Pempek 26 Ilir", width: "28vw", height: "auto", hover: "hover:bg-white", text: "hover:text-[var(--primary-color)]",},
    { path:"/explore", img: MegaCakes, title: "Mega Cakes Sukabangun", width: "28vw", height: "auto", hover: "hover:bg-white", text: "hover:text-[var(--primary-color)]",},
    { path:"/explore", img: PempekCandy, title: "Pempek Candy", width: "28vw", height: "auto", hover: "hover:bg-white", text: "hover:text-[var(--primary-color)]",},
    { path:"/explore", img: TokoHarum, title: "Toko Harum", width: "28vw", height: "auto", hover: "hover:bg-white", text: "hover:text-[var(--primary-color)]",},
];

export default function RestaurantList() {
    return(<>
        <div
            className={`inline-block w-[100%] relative`}
        >
             {/* Wave di atas */}
            <svg 
                className="bg-no-repeat bg-top w-[100%] translate-y-1 -z-10"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1440 320"
            >
                <path fill="#780b0d" fill-opacity="1" d="M0,192L60,208C120,224,240,256,360,272C480,288,600,288,720,261.3C840,235,960,181,1080,154.7C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>

            <h1
                className="relative z-10 text-[var(--secondary-color)] text-[1rem] md:text-[2rem] font-bold text-center bg-[var(--primary-color)] pb-10"
            >RESTAURANT</h1>
        </div>
        <div 
            className='relative z-10 bg-[var(--primary-color)]
                grid grid-cols-1 grid-cols-2 md:grid-cols-3 gap-6 p-6
                justify-items-center'
        >
            {Restoran.map((item, index) => (
                        <Card
                            path={item.path}
                            key={index}
                            img={item.img}
                            title={item.title}
                            width={item.width}
                            height={item.height}
                            hover={item.hover}
                            text={item.text}
                        />
                        ))}
        </div>
        <div>
            {/* To became legend */}
        </div>
    </>)
}