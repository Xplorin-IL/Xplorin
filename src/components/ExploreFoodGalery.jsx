import PempekKecil from "../assets/images/foodGalleryPempekKecil.png";
import Kemplang from "../assets/images/foodGalleryKemplang.png";
import KapalSelem from "../assets/images/foodGalleryPempek.png";
import MieCelor from "../assets/images/foodGalleryMieCelor.png"
import Celimpungan from "../assets/images/foodGalleryCelimpungan.png";
import Tekwan from "../assets/images/foodGalleryTekwan.png";
import Laksan from "../assets/images/foodGalleryLaksan.png";
import Lenggang from "../assets/images/foodGalleryLenggang.png";
import PindangPatin from "../assets/images/foodGalleryPindangPatin.png";
import { NavLink } from "react-router-dom";

const galleryItems = [
    { img: PempekKecil, path: "/", tittle: "Pempek", },
    { img: Kemplang, path: "/", tittle: "Kemplang", },
    { img: KapalSelem, path: "/", tittle: "Pempek Kapal Selam", },
    { img: MieCelor, path: "/", tittle: "Mie Celor", },
    { img: Celimpungan, path: "/", tittle: "Celimpungan", },
    { img: Tekwan, path: "/", tittle: "Tekwan", },
    { img: Laksan, path: "/", tittle: "Laksan", },
    { img: Lenggang, path: "/", tittle: "Pempek Lenggang", },
    { img: PindangPatin, path: "/", tittle: "Pindang Patin", },
];

export default function ExploreFoodGalery(){
    return(
        <section>
            {/* Judul */}
            <h1 className="text-left text-[2rem] md:text-[4rem] font-bold text-[var(--primary-color)] py-10 pl-[10%] lg:pl-[6.25%] ">
            Food Gallery
            </h1>
    
            {/* Grid Gambar */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-items-center">
            {galleryItems.map((item, index) => (
                <NavLink key={index} to={item.path}
                    className={`hover:shadow-xl/30 transition duration-300 `}
                >
                    <img
                        src={item.img}
                        alt={`food-${index}`}
                        className="w-50 md:w-60 lg:w-80 h-90 md:h-110 lg:h-150 object-cover"
                    />
                    <h1
                        className="text-[1rem] md:text-[1.5rem] lg:text-[2rem] text-center font-bold text-[var(--primary-color)] hover:text-shadow-xl/30"
                    >
                        {item.tittle}
                    </h1>
                </NavLink>
            ))}
            </div>
        </section>
    )
}