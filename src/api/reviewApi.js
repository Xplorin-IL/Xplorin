const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/reviews`;

// Submit review baru
export const submitReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit review');
    }

    return data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// Get 2 review terbaru + average rating
export const getUserReviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user-reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch reviews');
    }

    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// Get 20 reviews untuk carousel (10 baris atas, 10 baris bawah)
export const getCarouselReviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/carousel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch carousel reviews');
    }

    return data;
  } catch (error) {
    console.error('Error fetching carousel reviews:', error);
    throw error;
  }
};

// Get semua reviews (opsional)
export const getAllReviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch all reviews');
    }

    return data;
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw error;
  }
};
