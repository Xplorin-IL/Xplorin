import Pempek from "../assets/images/foodGalleryPempekKecil.png";
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
    { id: 1, img: KapalSelem, tittle: "Pempek Kapal Selam", },
    { id: 2, img: MieCelor, tittle: "Mie Celor", },
    { id: 3, img: Laksan, tittle: "Laksan", },
    { id: 4, img: PindangPatin, tittle: "Pindang Patin", },
    { id: 5, img: Celimpungan, tittle: "Celimpungan", },
    { id: 6, img: Pempek, tittle: "Pempek", },
    { id: 7,img: Kemplang, tittle: "Kemplang", },
    { id: 8, img: Tekwan, tittle: "Tekwan", },
    { id: 9, img: Tekwan, tittle: "Tekwan", },
    { id: 10, img: Tekwan, tittle: "Tekwan", },
    { id: 11, img: Tekwan, tittle: "Tekwan", },
    { id: 12, img: Lenggang, tittle: "Pempek Lenggang", },
    { id: 13, img: Lenggang, tittle: "Pempek Lenggang", },
];

export default function ExploreFoodGallery(){
    return(
        <section>
            {/* Judul */}
            <h1 className="text-left text-[2rem] md:text-[4rem] font-bold text-[var(--primary-color)] 
            py-10 pl-[10%] lg:pl-[6.25%] ">
            Food Gallery
            </h1>
    
            {/* Grid Gambar */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-items-center">
            {galleryItems.map((item, index) => (
                <NavLink key={index} to={`/makanan/${item.id}`}
                    className={`hover:shadow-xl/30 transition duration-300 `}
                >
                    <img
                        src={item.img}
                        alt={`food-${index}`}
                        className="w-50 md:w-60 lg:w-80 h-90 md:h-110 lg:h-150 object-cover"
                    />
                    <h1
                        className="text-[1rem] md:text-[1.5rem] lg:text-[2rem] text-center font-bold text-[var(--primary-color)] 
                        hover:text-shadow-xl/30"
                    >
                        {item.tittle}
                    </h1>
                </NavLink>
            ))}
            </div>
        </section>
    )
}