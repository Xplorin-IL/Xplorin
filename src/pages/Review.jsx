import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import AddReviewTab from '../components/AddReviewTab';
import UserReviewsTab from '../components/UserReviewsTab';

const bodyBackground = 'min-h-screen pt-28 pb-10 flex flex-col items-center font-sans overflow-x-hidden bg-review'; 

const Review = () => {
  const [activeTab, setActiveTab] = useState('addReview');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleReviewSubmitted = () => {
    // Trigger refresh untuk UserReviewsTab
    setRefreshTrigger(prev => prev + 1);
    // Pindah ke tab User Reviews
    setActiveTab('userReviews');
  };

  const baseClasses = 'py-4 px-8 rounded-t-2xl font-bold text-xl sm:text-2xl border-2 border-red-800 transition-colors duration-300';
  
  const solidClass = `${baseClasses} text-yellow-400 bg-red-800 hover:bg-red-900`;
  const outlineClass = `${baseClasses} text-red-800 bg-white hover:bg-red-800 hover:text-white`;

  const addReviewClasses = activeTab === 'addReview' ? solidClass : outlineClass;
  const userReviewsClasses = activeTab === 'userReviews' ? solidClass : outlineClass;

  const renderTabContent = () => {
    if (activeTab === 'addReview') {
      return <AddReviewTab onReviewSubmitted={handleReviewSubmitted} />;
    }
    return <UserReviewsTab refreshTrigger={refreshTrigger} />; 
  };

  return (
    <div className={bodyBackground}>
      <Navbar />

      <div className="z-10 w-full max-w-6xl px-4 flex justify-start mt-12">
        <section className="flex pl-0">
          <button 
            className={addReviewClasses} 
            onClick={() => setActiveTab('addReview')}
          >
            ADD A REVIEW
          </button>
          <button 
            className={userReviewsClasses} 
            onClick={() => setActiveTab('userReviews')}
          >
            USER REVIEWS
          </button>
        </section>
      </div>

      <div className="w-full max-w-6xl flex justify-center z-0">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Review;