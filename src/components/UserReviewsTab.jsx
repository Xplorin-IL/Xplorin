import React, { useEffect, useState } from 'react';
import { getCarouselReviews } from '../api/reviewApi';
import Quotation from '../assets/images/quotation.png';
import QuotationReverse from '../assets/images/quotation-reverse.png';
import UserIcon from '../assets/images/user-login.png';

const ReviewCard = ({ review, isReverse }) => {
  const { name, email, review_text, created_at } = review;
  const quoteImageSrc = isReverse ? QuotationReverse : Quotation;
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
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
      <p style={{ fontSize: '1rem' }} className={`text-red-800 ${isReverse ? 'text-left' : 'text-right'} flex-grow py-2 line-clamp-4`}>
        {review_text}
      </p>
      <div className={`flex items-center gap-2 ${isReverse ? 'flex-row-reverse' : 'flex-row'}`}>
        <img 
          src={UserIcon} 
          alt="User Icon"
          className="h-10 w-10 rounded-full object-cover" 
        />
        <div className={`text-xs text-red-800 ${isReverse ? 'text-right' : 'text-left'}`}>
          <p className="font-bold">{name}</p>
          <p className="text-gray-600">{formatDate(created_at)}</p>
        </div>
      </div>
    </div>
  );
};

const UserReviewsTab = ({ refreshTrigger }) => {
  const [topLineReviews, setTopLineReviews] = useState([]);
  const [bottomLineReviews, setBottomLineReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [refreshTrigger]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await getCarouselReviews();
      
      if (response.success) {
        setTopLineReviews(response.data.topLine);
        setBottomLineReviews(response.data.bottomLine);
        setAverageRating(parseFloat(response.data.average_rating));
        setTotalReviews(response.data.total_reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert average rating to stars display
  const getStarsDisplay = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {'⭐'.repeat(fullStars)}
        {hasHalfStar && '⭐'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  const scrollLeftClasses = 'flex gap-4 py-2 animate-scroll-left w-max'; 
  const scrollRightClasses = 'flex gap-4 py-2 animate-scroll-right w-max';

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full mt-[-1rem] bg-transparent pt-7">
        <p className="text-red-800 text-xl">Loading reviews...</p>
      </div>
    );
  }

  // Jika tidak ada review, tampilkan pesan
  if (topLineReviews.length === 0 && bottomLineReviews.length === 0) {
    return (
      <div className="flex flex-col items-center w-full mt-[-1rem] bg-transparent pt-7">
        <div className="w-full max-w-6xl px-4 mb-10">
          <div className="flex justify-between items-end">
            <h4 className="text-red-800 text-3xl font-bold">
              What They Say
            </h4>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <h4 className="text-red-800 text-4xl font-bold">0.0</h4>
                <div className="text-yellow-400 text-2xl">☆☆☆☆☆</div>
              </div>
              <p className="text-red-800 text-lg font-medium mt-1">0 Ratings</p>
            </div>
          </div>
        </div>
        <p className="text-red-800 text-xl">Belum ada review. Jadilah yang pertama!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-[-1rem] bg-transparent pt-7">
      
      <div className="w-full max-w-6xl px-4 mb-10">
        <div className="flex justify-between items-end">
          <h4 className="text-red-800 text-3xl font-bold">
            What They Say
          </h4>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <h4 className="text-red-800 text-4xl font-bold">{averageRating.toFixed(1)}</h4>
              <div className="text-yellow-400 text-2xl">{getStarsDisplay(averageRating)}</div>
            </div>
            <p className="text-red-800 text-lg font-medium mt-1">{totalReviews} Rating{totalReviews > 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>
      
      {/* Review Line 1 (Forward Scroll) - 10 Review Berbeda */}
      {topLineReviews.length > 0 && (
        <section className="scroller w-screen overflow-hidden mb-4 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className={scrollLeftClasses}>
            {/* Duplicate konten 2x untuk seamless infinite loop */}
            {[...topLineReviews, ...topLineReviews].map((review, index) => (
              <ReviewCard key={`top-${index}`} review={review} isReverse={false} />
            ))}
          </div>
        </section>
      )}

      {/* Review Line 2 (Reverse Scroll) - 10 Review Berbeda */}
      {bottomLineReviews.length > 0 && (
        <section className="scroller w-screen overflow-hidden">
          <div className={scrollRightClasses}>
            {/* Duplicate konten 2x untuk seamless infinite loop */}
            {[...bottomLineReviews, ...bottomLineReviews].map((review, index) => (
              <ReviewCard key={`bottom-${index}`} review={review} isReverse={true} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default UserReviewsTab;