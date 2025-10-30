import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
return (
<main className="font-inter text-gray-800 overflow-x-hidden">
    {/* Navbar */}
    <Navbar />

    {/* Header */}
    <section className="relative w-full h-[55vh] sm:h-[70vh] overflow-hidden mt-[14vh] mb-[6vh] px-2">
    <img
        src="/src/assets/images/amperaAboutUs.png"
        alt="About Us"
        className="w-full h-full object-cover filter grayscale"
    />
    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[9vw] sm:text-[5vw] font-extrabold text-center drop-shadow-md tracking-tight">
        ABOUT US
    </h1>
    </section>

    {/* Visi misi */}
    <section className="flex flex-col md:flex-row items-stretch bg-[#780b0d] text-white px-4 sm:px-[6vw] py-[5vh] sm:py-[9vh] space-y-6 md:space-y-0 md:space-x-4">
    <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-left">
        <h1 className="text-[1.4rem] sm:text-[2rem] lg:text-[2.8rem] font-extrabold leading-tight">
        OUR <br />
        VISION <br />
        AND <br />
        MISSION
        </h1>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-between text-center w-full">
        {[
        "To make Indonesian tourism feel closer through a simple, trustworthy, and personalized digital experience.",
        "To present an AI feature that provides travel recommendations tailored to user interests and needs.",
        "To deliver tourism information for Palembang, Batam, and Medan in a concise, engaging, and easily accessible manner.",
        ].map((text, idx, arr) => (
        <div
            key={idx}
            className="flex flex-col md:flex-row items-center md:items-start flex-1 px-2 sm:px-4"
        >
            <p className="text-[0.85rem] sm:text-[1rem] md:text-[1.1rem] leading-relaxed mb-4 md:mb-0">
            {text}
            </p>
            {idx < arr.length - 1 && (
            <div className="hidden md:block w-[1px] h-[25vh] bg-white mx-[2vw]" />
            )}
        </div>
        ))}
    </div>
    </section>

    {/* Team */}
    <h2 className="text-center text-[#780b0d] text-[4vh] sm:text-[5.5vh] font-bold mt-[7vh] mb-[4vh] px-4">
    TEAM MEMBERS
    </h2>

    {/* Web Team */}
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-[5vh] gap-x-[3vw] px-[6vw] pb-[10vh] justify-items-center">
    {[
        {
        name: "Alya Massardi",
        role: "Hustler",
        img: "/src/assets/images/alya.png",
        link: "https://id.linkedin.com/in/alya-massardi",
        },
        {
        name: "Izzah Rahma Auliya",
        role: "Hipster",
        img: "/src/assets/images/izzah.png",
        link: "https://id.linkedin.com/in/alya-massardi",
        },
        {
        name: "Indri Dwi Lestari",
        role: "Hipster",
        img: "/src/assets/images/indri.png",
        link: "https://id.linkedin.com/in/alya-massardi",
        },
        {
        name: "Vanessa",
        role: "Hacker",
        img: "/src/assets/images/vanessa.png",
        link: "https://id.linkedin.com/in/alya-massardi",
        },
        {
        name: "Muhammad Trio Novrian",
        role: "Hacker",
        img: "/src/assets/images/trio.png",
        link: "https://www.linkedin.com/in/muhammad-trio-novrian-15469a24b/",
        },
    ].map((member, idx) => (
        <div
        key={idx}
        className="text-center w-full max-w-[160px] sm:max-w-[200px] transition-transform hover:scale-105"
        >
        <a href={member.link} target="_blank" rel="noopener noreferrer">
            <div className="w-full aspect-square overflow-hidden rounded-xl shadow-md mb-2">
            <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
            />
            </div>
            <h3 className="text-[#780b0d] font-bold text-[0.95rem] sm:text-[1.1rem]">
            {member.name}
            </h3>
            <p className="text-gray-600 text-[0.8rem] sm:text-[0.9rem]">
            {member.role}
            </p>
        </a>
        </div>
    ))}
    </section>

    {/* AI Team */}
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-[4vh] gap-x-[2vw] px-[6vw] pb-[10vh] justify-items-center">
    {[
        {
        name: "Angga Kurniawan",
        role: "Design Researcher",
        img: "/src/assets/images/angga.png",
        link: "https://www.linkedin.com/in/angga-kurniawan-376a7620b",
        },
        {
        name: "Louis Angelica",
        role: "ML Operations",
        img: "/src/assets/images/louis.png",
        link: "https://www.linkedin.com/in/fairuz-athallah-57001923b",
        },
        {
        name: "Ayudya Putri Arini",
        role: "Data Engineer",
        img: "/src/assets/images/ayu.png",
        link: "https://www.linkedin.com/in/fairuz-athallah-57001923b",
        },
        {
        name: "Fairuz Athallah",
        role: "ML Engineer",
        img: "/src/assets/images/fairuz.png",
        link: "https://www.linkedin.com/in/fairuz-athallah-57001923b",
        },
    ].map((member, idx) => (
        <div
        key={idx}
        className="text-center w-full max-w-[160px] sm:max-w-[200px] transition-transform hover:scale-105"
        >
        <a href={member.link} target="_blank" rel="noopener noreferrer">
            <div className="w-full aspect-square overflow-hidden rounded-xl shadow-md mb-2">
            <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
            />
            </div>
            <h3 className="text-[#780b0d] font-bold text-[0.95rem] sm:text-[1.1rem]">
            {member.name}
            </h3>
            <p className="text-gray-600 text-[0.8rem] sm:text-[0.9rem]">
            {member.role}
            </p>
        </a>
        </div>
    ))}
    </section>

    {/* Footer */}
    <Footer />
</main>
);
};

export default About;
