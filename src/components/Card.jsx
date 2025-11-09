import restoranPempekCandy from '../assets/images/restoranPempekCandy.png';
import { Link } from 'react-router-dom';

export default function Card({
    path = "/",
    img = restoranPempekCandy,
    title = "Nama Restoran",
    height = "200px",
    width = "200px",
    hover = "hover:bg-[var(--primary-color)]",
    text = "hover:text-[var(--secondary-color)]",
    }) {
    return (
        <Link to={path}>
            <div
                className={`border-2 border-[#8b0000] rounded-md md:rounded-2xl
                    hover:scale-105 bg-white transition-transform duration-300 text-[#8b0000] 
                     ${hover} ${text}`}                
                    style={{ width, height, minHeight: "15vh", minWidth: "20vw"}}
            >
                <div className="flex justify-center w-full">
                    <img
                    src={img}
                    alt="Gambar Restoran"
                    className="p-2 rounded-md object-cover"
                    style={{ minHeight: "110%", minWidth: "100%" }}
                    />
                </div>
                    <h1 className="text-center font-bold text-[0.7rem] md:text-[1rem] px-2 py-2">{title}</h1>
            </div>
        </Link>
    );
    }
