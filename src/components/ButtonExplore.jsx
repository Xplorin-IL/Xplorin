import { Link } from "react-router-dom"

export default function ButtonExplore({path = "/explore", title = "Explore More"}) {
    return(<>
    <div className="p-10">
        <Link to={path}>
            <button
                className="border-2 border-[#8b0000] text-[#8b0000] p-1 md:p-2 font-bold text-sm md:text-xl  rounded-full hover:bg-[#8b0000] hover:text-white transition duration-300"
            >
                {title} 
            </button>
        </Link>
    </div>    
    </>)
}