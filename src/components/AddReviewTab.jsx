// AddReviewTab.jsx
import React, { useState } from 'react';

const AddReviewTab = () => {
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 0, 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = { ...formData, rating: rating };
    console.log('Submitted Review:', finalFormData);
  };
  
  // Convert Hex #780B0D to RGB (120, 11, 13)
  const customBackgroundColor = 'rgba(120, 11, 13, 0.3)';
  
  return (
    <nav 
      // ❗ FIX: Removed 'bg-red-300/80' and replaced with inline style using RGBA
      className="w-full min-h-[60vh] rounded-b-xl -mt-[1px] flex justify-center items-center py-10 px-4 relative overflow-hidden"
      style={{ backgroundColor: customBackgroundColor }} // Apply the custom color/opacity
    >
      <form className="flex flex-col items-center w-full max-w-md z-10 bg-transparent" onSubmit={handleSubmit}>
        
        {/* Title */}
        <p className="text-red-800 text-2xl font-bold mb-4">
          Add Your Rating For This Website
        </p>

        {/* ⭐ Interactive Stars */}
        <div className="flex gap-[1vh] mb-[3vh]">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-[6vh] transition ${
                (hover || rating) >= star
                  ? "text-[#ffcc33]" 
                  : "text-[#D8D8D8]"
              }`}
              onClick={() => {
                setRating(star);
                setFormData(prev => ({ ...prev, rating: star })); 
              }}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </button>
          ))}
        </div>

        {/* Form Fields */}
        {['Name', 'Email', 'Write Your Review'].map((label) => (
          <div key={label} className="flex flex-col w-full mb-4">
            <label className="text-white text-lg text-left mb-1 font-medium">{label}</label>
            {label === 'Write Your Review' ? (
              <textarea
                name="review"
                placeholder="Write here..."
                className="outline-none border-2 border-red-900 rounded-md p-3 text-base w-full shadow-md h-24 resize-none bg-white"
                required
              ></textarea>
            ) : (
              <input
                type={label === 'Email' ? 'email' : 'text'}
                name={label.toLowerCase()}
                placeholder={label === 'Name' ? 'Type here...' : 'email@gmail.com'}
                className="outline-none border-2 border-red-900 rounded-md p-3 text-base w-full shadow-md bg-white"
                required
              />
            )}
          </div>
        ))}
        
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-white text-red-800 font-bold text-xl border-2 border-red-800 rounded-md py-2 px-10 cursor-pointer transition-colors duration-200 mt-8 hover:bg-red-800 hover:text-white"
        >
          SUBMIT
        </button>
      </form>
    </nav>
  );
};

export default AddReviewTab;