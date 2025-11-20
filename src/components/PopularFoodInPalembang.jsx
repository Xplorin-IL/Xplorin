import { useRef } from "react";
import CardPopularFoodInPalembang from "../components/CardPopularFoodInPalembang";
import gambarPindang from "../assets/images/explorePopularFoodInPalembang_Pindang.png";
import gambarMartabakHar from "../assets/images/explorePopularFoodInPalembang_MartabakHar.png";
import gambarTekwan from "../assets/images/explorePopularFoodInPalembang_Tekwan.png";
import gambarEsKacangMerah from "../assets/images/explorePopularFoodInPalembang_EsKacangMerah.png";
import gambarMieCelor from "../assets/images/explorePopularFoodInPalembang_MieCelor.png";
import gambarLaksan from "../assets/images/explorePopularFoodInPalembang_Laksan.png";
import gambarPempek from "../assets/images/explorePopularFoodInPalembang_Pempek.png";

const foodData = [
  { id: 4, img: gambarPindang, path: "/makanan/4" },
  { id: 9, img: gambarMartabakHar, path: "/makanan/9" },
  { id: 10, img: gambarTekwan, path: "/makanan/10" },
  { id: 11, img: gambarEsKacangMerah, path: "/makanan/11" },
  { id: 2, img: gambarMieCelor, path: "/makanan/2" },
  { id: 3, img: gambarLaksan, path: "/makanan/3" },
  { id: 6, img: gambarPempek, path: "/makanan/6" },
];

export default function PopularFoodInPalembang() {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.firstChild.offsetWidth + 24; // 24 = gap-6
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    let newScrollLeft =
      direction === "left"
        ? container.scrollLeft - cardWidth
        : container.scrollLeft + cardWidth;

    // batas supaya bisa sampai ujung
    if (newScrollLeft < 0) newScrollLeft = 0;
    if (newScrollLeft > maxScrollLeft) newScrollLeft = maxScrollLeft;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      <h1 className="text-[var(--primary-color)] text-[1.2rem] md:text-[2.5rem] font-bold text-center mt-[20vh] py-5">
        POPULAR FOOD IN PALEMBANG
      </h1>

      <div className="relative flex items-center">
        {/* Tombol kiri */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 z-10 bg-[var(--primary-color)] text-white rounded-full p-3 hover:scale-110 transition"
        >
          ❮
        </button>

        {/* Container card */}
        <div
          ref={containerRef}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-8 w-full px-20"
        >
          {foodData.map((item, index) => (
            <div
              key={index}
              className="flex-none snap-center transition-transform duration-300 hover:scale-110 "
            >
              <CardPopularFoodInPalembang path={item.path} img={item.img} />
            </div>
          ))}
        </div>

        {/* Tombol kanan */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 z-10 bg-[var(--primary-color)] text-white rounded-full p-3 hover:scale-110 transition"
        >
          ❯
        </button>
      </div>
    </div>
  );
}
