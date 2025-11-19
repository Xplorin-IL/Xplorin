import PempekFlamboyantImage from '../assets/images/exploreRestaurant_Flamboyant.png';
import TokoHarumImage from '../assets/images/exploreRestaurant_Harum.png';
import KampungPempekImage from '../assets/images/exploreRestaurant_KampungPempek26Ilir.png';
import MartabakHarImage from '../assets/images/exploreRestaurant_MartabakHar.png';
import MegaCakeSukabangunImage from '../assets/images/exploreRestaurant_MegaCakeSukabangun.png';
import MieCelorImage from '../assets/images/exploreRestaurant_MieCelor16Ilir.png';
import PempekCandyImage from '../assets/images/exploreRestaurant_PempekCandy.png';
import PondokPindangUmakImage from '../assets/images/exploreRestaurant_PondokPindangUmak.png';
import RiverSideImage from '../assets/images/exploreRestaurant_RiverSide.png';
import ReviewBackground from '../assets/images/review-background.png';

const RESTAURANT_DATA = {
    'pempek-flamboyant': {
        title: "PEMPEK FLAMBOYANT",
        time: "06:00 - 21:00",
        description: "Pempek Flamboyant serves freshly made Palembang fish cakes with authentic flavors that have stood the test of time. From lenjer to kapal selam, each piece is soft, flavorful, and perfectly paired with their signature tangy-sweet vinegar sauce.",
        address: "Jl. Brigjen Hasan Kasim No.1516, Bukit Sangkal, Kec. Kalidoni, Kota Palembang, Sumatera Selatan 30163",
        mapsLink: "https://maps.app.goo.gl/example",
        image: PempekFlamboyantImage,
        socials: { instagram: "#", whatsapp: "#", facebook: "#" },
        menu: {
            left: [
                { item: "Kapal Selam", price: "Rp 20.000" },
                { item: "Lenjer Besar", price: "Rp 20.000" },
                { item: "Telor Kecil", price: "Rp 5.000" },
                { item: "Adaan", price: "Rp 5.000" },
                { item: "Kulit", price: "Rp 5.000" },
                { item: "Keriting", price: "Rp 5.000" },
            ],
            right: [
                { item: "Lempang", price: "Rp 20.000" },
                { item: "Tekwan", price: "Rp 20.000" },
                { item: "Pindang", price: "Rp 5.000" },
                { item: "Kemplang", price: "Rp 18.000" },
                { item: "Nasi Putih", price: "Rp 5.000" },
                { item: "Es Kacang Merah", price: "Rp 12.000" },
            ],
        }
    },

    'toko-harum': {
        title: "TOKO HARUM",
        time: "06:00 - 21:00",
        description: "Toko Harum is a long-standing local bakery offering various traditional cakes and Palembang snacks. Perfect for gifts or afternoon tea, each product is made with quality ingredients and a touch of nostalgia.",
        address: "Jl. Merdeka No.811, Talang Semut, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30135",
        mapsLink: "https://maps.app.goo.gl/example",
        image: TokoHarumImage,
        socials: { instagram: "#", whatsapp: "#", facebook: "#" },
        menu: {
            left: [
                { item: "Maksuba, Engkak", price: "Rp 70.000" },
                { item: "Kue 8 Jam", price: "Rp 70.000" },
                { item: "Kue Durian", price: "Rp 35.000" },
                { item: "Gulo Puan", price: "Rp 20.000" },
                { item: "Ketan Durian", price: "Rp 17.000" },
                { item: "Kue Gandus", price: "Rp 5.000" },
            ],
            right: [
                { item: "Es Sugu", price: "Rp 17.000" },
                { item: "Kopi Saring", price: "Rp 10.000" },
                { item: "Kopi Susu", price: "Rp 10.000" },
                { item: "Es Kacang Merah", price: "Rp 17.000" },
                { item: "Es Jeruk", price: "Rp 8.000" },
                { item: "Es Kopi Susu", price: "Rp 12.000" },
            ],
        }
    },

    'kampung-pempek': {
        title: "KAMPUNG PEMPEK",
        time: "06:00 - 21:00",
        description: "Kampung Pempek offers a cozy, traditional setting where visitors can enjoy a wide variety of Palembang-style pempek. With its warm atmosphere and freshly made dishes, it's a perfect place for families and tourists alike.",
        address: "Jl. Beringin Janggut, Talang Semut, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30135",
        mapsLink: "https://maps.app.goo.gl/example",
        image: KampungPempekImage,
        socials: { instagram: "#", whatsapp: "#", facebook: "#" },
        menu: {
            left: [
                { item: "Kapal Selam", price: "Rp 20.000" },
                { item: "Lenjer Besar", price: "Rp 20.000" },
                { item: "Telor Kecil", price: "Rp 5.000" },
                { item: "Adaan", price: "Rp 5.000" },
                { item: "Kulit", price: "Rp 5.000" },
                { item: "Keriting", price: "Rp 5.000" },
            ],
            right: [
                { item: "Lempang", price: "Rp 20.000" },
                { item: "Tekwan", price: "Rp 20.000" },
                { item: "Pindang", price: "Rp 5.000" },
                { item: "Kemplang", price: "Rp 18.000" },
                { item: "Nasi Putih", price: "Rp 5.000" },
                { item: "Es Kacang Merah", price: "Rp 12.000" },
            ],
        }
    },

    'martabak-har': {
        title: "MARTABAK HAR",
        time: "06:00 - 21:00",
        description: "A culinary icon of Palembang, Martabak Har has been serving savory egg martabak with rich curry sauce since the 1940s. The perfect blend of crispy dough and flavorful spices makes it a timeless favorite.",
        address: "Jl. Jend. Sudirman No.597A, 18 Ilir, Kec. Ilir Tim. I, Kota Palembang, Sumatera Selatan 30121",
        mapsLink: "https://maps.app.goo.gl/example",
        image: MartabakHarImage,
        socials: { instagram: "#", whatsapp: "#", facebook: "#" },
        menu: {
            left: [
                { item: "Martabak Telor Ayam", price: "Rp 15.000" },
                { item: "Martabak Telor Bebek", price: "Rp 17.000" },
                { item: "Martabak Spesial", price: "Rp 35.000" },
                { item: "Nasi Briyani", price: "Rp 10.000" },
                { item: "Malbi", price: "Rp 15.000" },
                { item: "Kambing Bumbu Cabe", price: "Rp 35.000" },
            ],
            right: [
                { item: "Es Sugu", price: "Rp 17.000" },
                { item: "Kopi Saring", price: "Rp 10.000" },
                { item: "Kopi Susu", price: "Rp 10.000" },
                { item: "Es Kacang Merah", price: "Rp 17.000" },
                { item: "Es Jeruk", price: "Rp 8.000" },
                { item: "Es Kopi Susu", price: "Rp 12.000" },
            ],
        }
    },

    'mega-cakes': {
        title: "MEGA CAKES",
        time: "08:00 - 18:00",
        description: "Mega Cakes is Palembang’s go-to place for layered cakes and sweet pastries. Each creation blends traditional recipes with modern taste, making it a popular choice for gifts and celebrations.",
        address: " Jl. Suka Bangun ll, Suka Bangun, Kec.Sukarami, Kota Palembang, Sumatera Selatan 30135",
        mapsLink: "https://maps.app.goo.gl/example",
        image: MegaCakeSukabangunImage,
        socials: { instagram: "#", whatsapp: "#", facebook: "#" },
        menu: {
            left: [
                { item: "Maksuba, Engkak", price: "Rp 70.000" },
                { item: "Kue 8 Jam", price: "Rp 70.000" },
                { item: "Cake Pandan", price: "Rp 40.000" },
                { item: "Cake Caramel", price: "Rp 40.000" },
                { item: "Cake Marmer", price: "Rp 35.000" },
                { item: "Cake Tape", price: "Rp 35.000" },
            ],
            right: [
                { item: "Kemplang Panggang", price: "Rp 15.000" },
                { item: "Kue Gandus", price: "Rp 10.000" },
                { item: "Kue Lumpang", price: "Rp 10.000" },
                { item: "Kue Kojo", price: "Rp 17.000" },
                { item: "Kue Srikaya", price: "Rp 8.000" },
                { item: "Lempok Durian", price: "Rp 35.000" },
            ],
        }
    },

    'mie-celor': {
        title: "MIE CELOR 26 ILIR",
        time: "06:00 - 21:00",
        description: "Famous for its creamy coconut milk broth, Mie Celor 26 Ilir offers a comforting noodle dish topped with shrimp and boiled eggs. A delicious, filling meal that captures the warmth of Palembang’s traditional flavors.",
        address: " Jl. KH. Ahmad Dahlan No.2, 26 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30136",
        mapsLink: "https://maps.app.goo.gl/example",
        image: MieCelorImage,
        socials: { instagram: "#", whatsapp: "#", facebook: "#" },
        menu: {
            left: [
                { item: "Paket Triple (3 Porsi Mie Celor)", price: "Rp 20.000" },
                { item: "1 Porsi Mie Celor + 1 Porsi Es Kacang Merah", price: "Rp 53.000" },
                { item: "2 Porsi Mie Celor + 1 Porsi Laksan", price: "Rp 92.000" },
            ],
            right: [
            ],
        }
    },
    
    'pempek-candy': {
        title: "PEMPEK CANDY",
        time: "06:00 - 21:00",
        description: "A legendary destination for pempek lovers, Pempek Candy combines tradition and quality in every serving. Its soft texture, rich fish flavor, and balanced cuko sauce have made it a true icon of Palembang cuisine.",
        address: "Jl. Rajawali no 550, Palembang 30114",
        mapsLink: "https://maps.app.goo.gl/example",
        image: PempekCandyImage,
        socials: { instagram: "#", whatsapp: "#", facebook: "#" },
        menu: {
            left: [
                { item: "Kapal Selam", price: "Rp 20.000" },
                { item: "Lenjer Besar", price: "Rp 20.000" },
                { item: "Telor Kecil", price: "Rp 5.000" },
                { item: "Adaan", price: "Rp 5.000" },
                { item: "Kulit", price: "Rp 5.000" },
                { item: "Keriting", price: "Rp 5.000" },
            ],
            right: [
                { item: "Lempang", price: "Rp 20.000" },
                { item: "Tekwan", price: "Rp 20.000" },
                { item: "Pindang", price: "Rp 5.000" },
                { item: "Kemplang", price: "Rp 18.000" },
                { item: "Nasi Goreng", price: "Rp 14.000" },
                { item: "Es Kacang Merah", price: "Rp 12.000" },
            ],
        }
    },

    'pindang-umak': {
        title: "PINDANG UMAK",
        time: "06:00 - 21:00",
        description: "Pindang Umak is one of Palembang’s favorite spots to enjoy the city’s signature spicy-sour fish soup. Known for its rich broth and variety of fresh fish options, this restaurant offers authentic Palembang comfort food in a relaxed and welcoming setting.",
        address: " Jl. Brigjen Hasan Kasim No.1516, Bukit Sangkal, Kec. Kalidoni, Kota Palembang, Sumatera Selatan 30163",
        mapsLink: "https://maps.app.goo.gl/example",
        image: PondokPindangUmakImage,
        socials: { instagram: "#", whatsapp: "#", facebook: "#" },
        menu: {
            left: [
                { item: "Pindang Udang", price: "Rp 63.000" },
                { item: "Pindang Patin", price: "Rp 43.000" },
                { item: "Pindang Baung", price: "Rp 70.000" },
                { item: "Pindang Gabus/Toman", price: "Rp 10.000" },
                { item: "Pindang Salai", price: "Rp 15.000" },
                { item: "Pindang Burung Puyuh", price: "Rp 56.000" },
            ],
            right: [
                { item: "Pepes Tempoyak Patin", price: "Rp 45.000" },
                { item: "Pepes Tempoyak Baung", price: "Rp 43.000" },
                { item: "Nasi", price: "Rp 10.000" },
                { item: "Ayam Goreng", price: "Rp 25.000" },
                { item: "Ikan Goreng", price: "Rp 30.000" },
                { item: "Bebek Bakar", price: "Rp 56.000" },
            ],
        }
    },

    'river-side': {
        title: "RIVER SIDE",
        time: "08:00 - 18:00",
        description: "Located by the Musi River, River Side Restaurant combines scenic views with traditional Palembang cuisine. Guests can enjoy local dishes while admiring the beauty of Ampera Bridge and the calm river breeze.",
        address: "Komplek Benteng Kuto Besar Jl. Rumah Bari,19 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30135",
        mapsLink: "https://maps.app.goo.gl/example",
        image: RiverSideImage,
        socials: { instagram: "#", whatsapp: "#", facebook: "#" },
        menu: {
            left: [
                { item: "Pindang Udang Satang", price: "Rp 105.000" },
                { item: "Pindang Ikan Baung", price: "Rp 70.000" },
                { item: "Pindang Ikan Patin", price: "Rp 40.000" },
                { item: "Pindang Iga", price: "Rp 60.000" },
                { item: "Brengkes Patin Asam Pedas ", price: "Rp 40.000" },
                { item: "Brengkes Patin Tempoyak", price: "Rp 40.000" },
            ],
            right: [
                { item: "Ikan Seluang Goreng", price: "Rp 45.000" },
                { item: "Sambal Goreng Udang", price: "Rp 20.000" },
                { item: "Pempek Kapal Selam", price: "Rp 30.000" },
                { item: "Lalapan dan Sambal", price: "Rp 10.000" },
            ],
        }
    },


    // ADD YOUR OTHER 8 RESTAURANTS HERE, using their slug as the key
    // 'flamboyant': { title: "Flamboyant", ... },
};

export { RESTAURANT_DATA, ReviewBackground };