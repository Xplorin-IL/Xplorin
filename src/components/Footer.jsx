const Footer = () => {
    return (
        <footer className="bg-[#691C19] mt-20 text-white px-[8vw] py-[6vh] flex flex-col md:flex-row items-start justify-between gap-[4vw]">
        
        {/* Logo & Socmed */}
        <div className="flex flex-col items-start gap-4 md:w-1/3">
            <div className="flex items-center gap-2">
            <img
            src="/src/assets/images/amperaLogo.png"
            alt="Xplorin Logo Text"
            className="w-[240px] h-auto object-contain"
            />
            </div>


            {/* Socmed Icons (sementara teks dulu) */}
            <div className="flex items-center gap-4 text-[1rem] mt-2">
            <span>Instagram</span>
            <span>Google</span>
            <span>Facebook</span>
            <span>WhatsApp</span>
            <span>X</span>
            </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-[min(22vh,200px)] bg-white"></div>

        {/* About */}
        <div className="flex flex-col items-center text-center md:w-1/3 px-[2vw] mt-[1.5vh]">
            <h2 className="text-[1.2rem] font-semibold mb-1">About</h2>
            <p className="text-[0.95rem] leading-relaxed">
            Xplorin is your go-to destination for culinary exploration, bringing you
            closer to genuine local tastes and a lively network of food enthusiasts.
            </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-[min(22vh,200px)] bg-white"></div>

        {/* Company & Contact */}
        <div className="flex flex-col md:w-1/3 gap-2 text-left">
            <div>
            <h2 className="text-[1.2rem] font-semibold mb-1">Company</h2>
            <p className="text-[0.95rem]">Infinite Learning</p>
            </div>

            <div className="mt-4">
            <p className="text-[0.95rem]">
                <span className="font-medium">Call :</span><br />
                +62 0123 4567 8910
            </p>
            <p className="text-[0.95rem] mt-2">
                <span className="font-medium">Email :</span><br />
                xplorin@gmail.com
            </p>
            </div>
        </div>
        </footer>
    );
};

export default Footer;
