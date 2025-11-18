import {NavLink} from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [hoverTop, setHoverTop] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleLogout = () => {
        dispatch(logout());
        setShowDropdown(false);
        navigate('/');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
    <>
        <div className="fixed top-0 left-0 w-full h-4fff z-9999"
            onMouseEnter={() => setHoverTop(true)}
            onMouseLeave={() => setHoverTop(false)}/>

        <nav className={`
            fixed top-[4%] left-[2%] right-[2%] z-10 transition-all duration-300 
            ${hidden && !hoverTop ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
        `}
        >
            <div className="flex justify-between items-center px-10 py-2 bg-white border-b border-gray-200 rounded-full gap-5 md:gap-10">
                {/* Logo */}
                <div className="w-20 md:w-[100px] lg:w-[150px]">
                <img src="/images/logo-component.png" alt="Xplorin Logo" className="h-full" />
                </div>

                {/* Nav Links */}
                <ul className="flex gap-2 md:gap-10 lg:gap-25 list-none">
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
                                    ? "text-[0.7rem] md:text-[0.8rem] lg:text-base text-[#8b0000] font-bold md:font-extrabold underline underline-offset-4 decoration-[#ffbf00] decoration-[3px]"
                                    : "text-[0.7rem] md:text-[0.8rem] lg:text-base text-[#8b0000] font-medium md:font-bold hover:text-[#ff2200] hover:underline hover:underline-offset-4 hover:decoration-[#fcb500] hover:decoration-2"
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Login Button or User Profile */}
                {isAuthenticated ? (
                    <div className="relative">
                        <button 
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#8b0000] 
                                hover:bg-[#8b0000] transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-[#8b0000] group-hover:bg-white 
                                flex items-center justify-center text-white group-hover:text-[#8b0000] 
                                font-bold text-sm transition-all">
                                {getInitials(user?.full_name || user?.username)}
                            </div>
                            <span className="text-[0.8rem] lg:text-base text-[#8b0000] font-bold 
                                group-hover:text-white hidden md:block transition-all">
                                {user?.username}
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg 
                                border border-gray-200 py-2 z-50">
                                <Link 
                                    to="/profile" 
                                    onClick={() => setShowDropdown(false)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                                        hover:text-[#8b0000] transition"
                                >
                                    👤 Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 
                                        hover:bg-red-50 transition"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to={"/login"}>
                        <button className="flex items-center text-[0.7rem] md:text-[0.7rem] lg:text-base 
                            px-4 py-1.5 border border-[#8b0000] rounded-full text-[#8b0000] font-bold transition
                            hover:bg-[#8b0000] hover:text-white">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    </>
    );
};

export default Navbar;
