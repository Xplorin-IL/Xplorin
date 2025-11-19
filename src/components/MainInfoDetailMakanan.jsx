export default function MainInfoDetailMakanan({ data }) {
    return (
        <div className="p-6 mt-10">
            <h1 className="text-[6rem] font-bold text-[var(--primary-color)] uppercase leading-tight mb-4">
                {data.name}
            </h1>
            <p className="font-bold text-lg mb-6">{data.price}</p>

            <div className="flex justify-center mb-6">
                <img 
                    src={data.mainImage} 
                    alt={data.name} 
                    className="w-[800px] rounded-xl"
                />
            </div>

            <p className="text-gray-700 leading-relaxed max-w-2xl text-center translate-x-27">
                {data.description}
            </p>
        </div>
    );
}
