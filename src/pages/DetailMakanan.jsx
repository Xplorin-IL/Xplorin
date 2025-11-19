import { useParams } from "react-router-dom";
import foodData from "../data/foods.json";
import MainInfoDetailMakanan from "../components/MainInfoDetailMakanan.jsx";
import GalleryDataMakanan from "../components/GalleryDataMakanan.jsx";

export default function DetailMakanan() {
    const { id } = useParams();
    const makanan = foodData.find(item => item.id === Number(id));

    if (!makanan){
        return <h2>Data Makanan Tidak Ditemukan!</h2>
    }
    return(<>
        <div
            className="grid grid-cols-[auto_auto] gap-4 mt-12 px-4 items-start"
        >
            <MainInfoDetailMakanan data={makanan}/>
            <GalleryDataMakanan data={makanan}/>
        </div>
    </>)
}