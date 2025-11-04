import restoranPempekCandy from '../assets/images/restoranPempekCandy.png';
import { Link } from 'react-router-dom';

export default function Card({
    path = "/",
    img = restoranPempekCandy,
    title = "Nama Restoran",
    height = "200px",
    width = "200px",
    }) {
    return (
        <Link to={path}>
            <div
                className="border-2 border-[#8b0000] rounded-md hover:scale-105 hover:bg-[#8b0000] transition-transform duration-300 text-[#8b0000] hover:text-[var(--secondary-color)]"
                style={{ width, height }}
            >
                <div className="flex justify-center w-full">
                    <img
                    src={img}
                    alt="Gambar Restoran"
                    className="p-2 rounded-md object-cover"
                    style={{ maxHeight: "80%", maxWidth: "90%" }}
                    />
                </div>
                    <h1 className="text-center font-bold">{title}</h1>
            </div>
        </Link>
    );
    }
