import KapalSelem from "../assets/images/foodGalleryPempek.png";
import Laksan from "../assets/images/foodGalleryLaksan.png";
import Kemplang from "../assets/images/foodGalleryKemplang.png";
import PempekKecil from "../assets/images/foodGalleryPempekKecil.png";
import Lenggang from "../assets/images/foodGalleryLenggang.png";
import MieCelor from "../assets/images/foodGalleryMieCelor.png"
import { NavLink } from "react-router-dom";
import ButtonExplore from "../components/ButtonExplore";

const galleryItems = [
  { img: KapalSelem, path: "/" },
  { img: PempekKecil, path: "/" },
  { img: Kemplang, path: "/" },
  { img: Lenggang, path: "/" },
  { img: Laksan, path: "/" },
  { img: MieCelor, path: "/" },
];

export default function FoodGallery() {
  return (
    <section>
      {/* Judul */}
      <h1 className="text-center text-2xl md:text-5xl font-bold text-[#8b0000] mb-10">
        Food Gallery
      </h1>

      {/* Grid Gambar */}
      <div className="grid grid-cols-6 m-0 p-0 gap-0">
        {galleryItems.map((item, index) => (
          <NavLink key={index} to={item.path}>
            <img
              src={item.img}
              alt={`food-${index}`}
              className="hover:scale-105 transition duration-300 w-full object-cover h-40 md:h-70 lg:h-100"
            />
          </NavLink>
        ))}
      </div>
      <div className="flex justify-center">
        <ButtonExplore path="/explore#sectionFoodGallery" />
      </div>

    </section>
  );
}
