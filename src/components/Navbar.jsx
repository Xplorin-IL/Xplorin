import {NavLink} from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [hoverTop, setHoverTop] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true); // scroll down → hide
            } else {
                setHidden(false); // scroll up → show
            }
            lastScrollY = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
    <>
        <div className="fixed top-0 left-0 w-full h-4fff z-[9999]"
            onMouseEnter={() => setHoverTop(true)}
            onMouseLeave={() => setHoverTop(false)}/>

        <nav className={`
            fixed top-[4%] left-[2%] right-[2%] z-10 transition-all duration-300 
            ${hidden && !hoverTop ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
        `}
        >
            <div className="flex justify-between items-center px-10 py-2 bg-white border-b border-gray-200 rounded-full gap-3">
                {/* Logo */}
                <div className="min-w-[80px] w-[80px] md:w-[150px]">
                <img src="/images/logo-component.png" alt="Xplorin Logo" className="h-full" />
                </div>

                {/* Nav Links */}
                <ul className="flex gap-2 md:gap-8 list-none">
                    {[
                        { name: "Home", path: "/" },
                        { name: "Explore", path: "/explore" },
                        { name: "Assistant", path: "/assistant" },
                        { name: "Review", path: "/review" },
                        { name: "About", path: "/about" },
                    ].map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => isActive
                                    ? "text-[0.7rem] md:text-base text-[#8b0000] font-bold md:font-extrabold underline underline-offset-4 decoration-[#ffbf00] decoration-[3px]"
                                    : "text-[0.7rem] md:text-base text-[#8b0000] font-medium md:font-bold hover:text-[#ff2200] hover:underline hover:underline-offset-4 hover:decoration-[#fcb500] hover:decoration-2"
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <Link to={"/login"}>
                    <button className="flex text-[0.7rem] md:text-base items-center px-4 py-1.5 border border-[#8b0000] rounded-full text-[#8b0000] font-bold transition hover:bg-[#8b0000] hover:text-white">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    </>
    );
};

export default Navbar;
