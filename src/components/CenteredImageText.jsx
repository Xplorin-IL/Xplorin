// src/components/CenteredImageText.jsx
export default function CenteredImageText({
    src = "/images/SeparatorExplore.png",
    alt = "Background Image",
    text = "To Became Legend",
    textColor = "text-white",
    textSize = "text-[4rem]",
    shadow = "drop-shadow-lg",
    className = ""
}) {
    return (
        <div className={`relative w-full ${className}`}>
        <img 
            className="w-full bg-no-repeat object-cover"
            src={src}
            alt={alt}
        />
        
        <h1
            className={`absolute inset-0 flex items-center justify-center font-bold 
                        ${textColor} ${textSize} ${shadow}`}
        >
            {text}
        </h1>
        </div>
    );
}
