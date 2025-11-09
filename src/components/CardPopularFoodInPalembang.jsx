import exploreFoodinPalembangPindang from '../assets/images/explorePopularFoodInPalembang_Pindang.png';
import { Link } from 'react-router-dom';

export default function CardPopularFoodInPalembang({
    path = "/",
    img = exploreFoodinPalembangPindang,
}){
    return(<>
    <Link 
        to={path}
        className ="block w-[30vh] h-[40vh] overflow-hidden shadow-[5px_4px_10px_var(--primary-color)] transform skew-x-[-5deg] transition-transform duration-300"
    >
        <img src={img} alt="gambar-makanan"
            className ="object-cover h-full w-full"
        />
    </Link>
        
    </>)
}