import Quotation from '../assets/images/quotation.png';
import QuotationReverse from '../assets/images/quotation-reverse.png';
import UserIcon from '../assets/images/user-login.png';

// Sample review data
const reviewData = [
  { text: "Great platform! I tried several local dishes based on the recommendations, and every place was worth visiting. Truly captured the taste of Palembang.", reviewerName: "James", reviewerCountry: "Germany", isReverse: false },
  { text: "Saya suka fitur explore-nya, memudahkan saya mencari kuliner sesuai kategori. Pempeknya enak banget, ditambah cuka khas yang bikin nagih!", reviewerName: "Dona", reviewerCountry: "Indonesia", isReverse: false },
  { text: "This platform made my culinary trip so much easier, from street food to traditional restaurants, everything is well organized. A must-use for travelers.", reviewerName: "Zack", reviewerCountry: "United Kingdom", isReverse: false },
  { text: "Pengalaman kuliner di Palembang sangat berkesan. Saya menemukan banyak tempat makan khas, mulai dari pempek sampai tekwan dengan rasa autentik. Website ini benar-benar membantu menemukan spot terbaik.", reviewerName: "Rina", reviewerCountry: "Indonesia", isReverse: false },

  { text: "Such a helpful website. LOVE IT. I can easily find the food that I want to eat...", reviewerName: "Qebib", reviewerCountry: "Arab", isReverse: true },
  { text: "I was amazed by how detailed the reviews are. It felt like having a local friend guiding me through Palembang's hidden food gems", reviewerName: "Alisha", reviewerCountry: "Brunei", isReverse: true },
  { text: "Palembang ternyata punya banyak makanan khas selain pempek. Dari pindang ikan sampai kue maksuba, semua saya temukan lewat website ini.", reviewerName: "Siti", reviewerCountry: "Malaysia", isReverse: true },
  { text: "The recommendations are so useful! I actually found the best pempek in town and even discovered local dishes I had never heard of before. A great guide for food lovers.", reviewerName: "Jess", reviewerCountry: "Singapore", isReverse: true },
];

const fullForwardSet = reviewData.filter(r => !r.isReverse);
const forwardReviews = [...fullForwardSet, ...fullForwardSet, ...fullForwardSet, ...fullForwardSet];

const fullReverseSet = reviewData.filter(r => r.isReverse);
const reverseReviews = [...fullReverseSet, ...fullReverseSet, ...fullReverseSet, ...fullReverseSet];

const ReviewCard = ({ review }) => {
  const { text, reviewerName, reviewerCountry, isReverse } = review;
  const quoteImageSrc = isReverse ? QuotationReverse : Quotation;
  
  const cardClasses = "h-[18rem] w-[18rem] p-4 flex-shrink-0 rounded-xl bg-white outline outline-red-800 outline-2 flex flex-col justify-between shadow-md";

  return (
    <div className={cardClasses}>
      <div className={`flex ${isReverse ? 'justify-end' : 'justify-start'}`}>
        <img 
          src={quoteImageSrc} 
          alt="Quotation Mark" 
          className="h-6"
        />
      </div>
      <p style={{ fontSize: '1rem' }} className={`text-red-800 ${isReverse ? 'text-left' : 'text-right'} flex-grow py-2`}>
        {text}
      </p>
      <div className={`flex items-center gap-2 ${isReverse ? 'flex-row-reverse' : 'flex-row'}`}>
        <img 
          src={UserIcon} 
          alt="User Icon"
          className="h-10 w-10 rounded-full object-cover" 
        />
        <p className="text-xs text-red-800 font-bold">
          {reviewerName}<br/>{reviewerCountry}
        </p>
      </div>
    </div>
  );
};

const UserReviewsTab = () => {
  const scrollLeftClasses = 'flex gap-4 py-2 animate-scroll-left w-max'; 
  const scrollRightClasses = 'flex gap-4 py-2 animate-scroll-right w-max'; 

  return (
    <div className="flex flex-col items-center w-full mt-[-1rem] bg-transparent pt-7">
      
      <div className="w-full max-w-6xl px-4 mb-10">
        <div className="flex justify-between items-end">
          <h4 className="text-red-800 text-3xl font-bold">
            What They Say
          </h4>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <h4 className="text-red-800 text-4xl font-bold">4.0</h4>
              <div className="text-yellow-400 text-2xl">⭐⭐⭐⭐☆</div>
            </div>
            <p className="text-red-800 text-lg font-medium mt-1">50 Ratings</p>
          </div>
        </div>
      </div>
      
      {/* Review Loop 1 (Forward Scroll) */}
      <section className="scroller w-screen overflow-hidden mb-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className={scrollLeftClasses}>
          {forwardReviews.map((review, index) => (
            <ReviewCard key={`fw-${index}`} review={review} />
          ))}
        </div>
      </section>

      {/* Review Loop 2 (Reverse Scroll) */}
      <section className="scroller w-screen overflow-hidden">
        <div className={scrollRightClasses}>
          {reverseReviews.map((review, index) => (
            <ReviewCard key={`rev-${index}`} review={review} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserReviewsTab;