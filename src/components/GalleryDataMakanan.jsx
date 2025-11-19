export default function GalleryDataMakanan({ data }) {
    if (!data.gallery || data.gallery.length === 0) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-4">
                    {data.name} Gallery
                </h2>
                <p className="text-gray-500">No gallery images available.</p>
            </div>
        );
    }

    return (
        <div className="p-6 mt-20">
            <div className="grid grid-cols-1 gap-4">
                {data.gallery.map((imgPath, index) => (
                    <div key={index} className="flex justify-center">
                        <img
                            className="w-40 h-40 object-cover rounded-lg"
                            src={imgPath.endsWith(".png") ? imgPath : imgPath + ".png"}
                            alt={`${data.name}-${index}`}
                            onError={(e) => {
                                e.target.src = "/images/placeholder.png";
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
