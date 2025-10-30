import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import cikoReady from "/images/cikoReady.png";
import cikoNotReady from "/images/cikoNotReady.png";

export default function MaskotCiko() {
const [isHovered, setIsHovered] = useState(false);

return (
<Link to="/assistant">
    <motion.div
    className="fixed right-7 bottom-5 cursor-pointer"
    whileTap={{ scale: 0.95}}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}
    onHoverStart={() => setIsHovered(true)}
    onHoverEnd={() => setIsHovered(false)}
    whileHover={{ scale: 1.05, }}
    >
    <motion.img
        className="w-40 md:w-50 lg:w-60"
        src={isHovered ? cikoReady : cikoNotReady}
        alt={isHovered ? "cikoready" : "cikonotready"}
        animate={{ filter: isHovered ? "brightness(1.3)" : "brightness(1)" }}
        transition={{ duration: 0.1 }}
    />
    </motion.div>
</Link>
);
}
