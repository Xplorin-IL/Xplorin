import Card from "./Card";
import ButtonExplore from "./ButtonExplore";
import restoranMie from "../assets/images/restoranMieCelorSyafei.png";
import restoranHar from "../assets/images/restoranMartabakHar.png";
import restoranPempekCandy from "../assets/images/restoranPempekCandy.png";

const Restoran = [
    { path:"/explore",img: restoranMie, title: "Mie Celor H. Syafei", width: "20vw", height: "auto" },
    { path:"/explore", img: restoranPempekCandy, title: "Pempek Candy", width: "20vw", height: "auto" },
    { path:"/explore", img: restoranHar, title: "Martabak Har", width: "20vw", height: "auto" },
    ];

    export default function FamousRestaurant() {
    return (
        <div className="px-[5vw] pt-20 flex justify-center gap-5 flex-wrap">
        <div>
            <h1 className="text-[#8b0000] text-[2rem] md:text-[3rem] font-bold text-left">
                Most Famous <br /> Restaurant
            </h1>
            <div className="flex justify-left -translate-x-10 text">
                <ButtonExplore />
            </div>
        </div>
        <div className="flex justify-between gap-5 items-end">
            {Restoran.map((item, index) => (
            <Card
                path={item.path}
                key={index}
                img={item.img}
                title={item.title}
                width={item.width}
                height={item.height}
            />
            ))}
        </div>
        </div>
    );
    }
