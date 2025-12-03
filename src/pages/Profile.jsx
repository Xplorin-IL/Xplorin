import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../store/authSlice';
import { FiCamera, FiChevronLeft, FiEdit2 } from 'react-icons/fi';
import { updateUserProfile } from '../api/profileApi';

const ACCENT_COLOR = '#800000';

// Dummy list for username validation (you can replace with API call)
const USED_USERNAMES = ['admin', 'test123', 'user456'];

const checkUsernameAvailability = async (newUsername) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(!USED_USERNAMES.includes(newUsername.toLowerCase()));
    }, 500);
  });
};

// Helper function to convert full_name to firstName and lastName
const parseFullName = (fullName = '') => {
  const parts = fullName.trim().split(' ');
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || ''
  };
};

// Helper function to get profile picture initials
const getInitials = (name = '') => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

// Helper function to compress image
const compressImage = (base64String, maxWidth = 400, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to compressed base64
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = base64String;
  });
};

const Button = ({ children, onClick, className = '', style, type = 'button', disabled = false }) => {
  const baseStyle = "px-3 sm:px-4 py-1.5 sm:py-2 font-medium transition duration-200 text-sm sm:text-base";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        color: ACCENT_COLOR,
        borderColor: ACCENT_COLOR,
        backgroundColor: 'white',
        ...style,
      }}
      className={`${baseStyle} border rounded-lg hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

const InputField = ({ label, id, name, value, onChange, type = 'text', error = null, onBlur }) => (
  <div className="mb-3 sm:mb-4">
    <label htmlFor={id} className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full border rounded-lg p-2 sm:p-2.5 text-sm focus:outline-none transition
        focus:ring-1 focus:ring-red-500 focus:border-red-500
        ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const SectionCard = ({ title, children, onEdit }) => (
  <div className={`bg-white p-0 rounded-lg border mb-6`} style={{ borderColor: ACCENT_COLOR }}>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 border-b gap-3" style={{ borderColor: ACCENT_COLOR }}>
      <h2 className="text-lg sm:text-xl font-bold text-gray-800" style={{ color: ACCENT_COLOR }}>{title}</h2>
      {onEdit && (
        <Button onClick={onEdit} className="flex items-center justify-center sm:justify-start gap-1 py-1 px-3 w-full sm:w-auto">
          <span>Edit</span>
          <FiEdit2 size={16} />
        </Button>
      )}
    </div>
    <div className="p-4 sm:p-6">
      {children}
    </div>
  </div>
);

const EditModal = ({ title, fields, initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors, formData]);

  const handleDone = () => {
    // Save changes when user clicks Done
    console.log('💾 Modal Done - saving changes:', formData);
    onSave(formData);
    onClose();
  };

  const handleBlur = useCallback(async (e) => {
    const { name, value } = e.target;
    if (name === 'username' && value.toLowerCase() !== initialData.username.toLowerCase() && value.trim() !== '') {
      setErrors(prev => ({ ...prev, username: 'Checking availability...' }));
      const isAvailable = await checkUsernameAvailability(value);

      if (!isAvailable) {
        setErrors(prev => ({ ...prev, username: "This username is already taken. Try another." }));
      } else {
        setErrors(prev => ({ ...prev, username: null }));
      }
    } else if (name === 'username' && value.trim() === '') {
        setErrors(prev => ({ ...prev, username: "Username is required." }));
    }
  }, [initialData.username]);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-md bg-white/30">
      <div className="bg-white rounded-xl w-full max-w-sm sm:max-w-lg shadow-2xl border-2 border-gray-200">
        <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: ACCENT_COLOR }}>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800" style={{ color: ACCENT_COLOR }}>{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <FiChevronLeft size={20} style={{ color: ACCENT_COLOR }} />
          </button>
        </div>
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
          {fields.map(field => (
            <InputField
              key={field.name}
              id={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              onBlur={field.name === 'username' ? handleBlur : undefined}
              type={field.type}
              error={errors[field.name]}
            />
          ))}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end mt-6">
            <Button 
              type="button" 
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleDone}
              style={{ 
                  backgroundColor: ACCENT_COLOR, 
                  color: 'white', 
                  borderColor: ACCENT_COLOR,
              }}
              className="w-full sm:w-auto"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileHeader = ({ userData, onPictureChange }) => {
  const fileInputRef = React.useRef(null);

  const handleCameraClick = () => fileInputRef.current.click();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('📸 File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        event.target.value = ''; // Reset input
        return;
      }

      // Validate file size (5MB max before compression)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size too large. Please select an image under 5MB');
        event.target.value = ''; // Reset input
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          console.log('🖼️ Image loaded, compressing...');
          // Compress image before saving
          const compressedImage = await compressImage(reader.result, 400, 0.7);
          console.log('✅ Image compressed, size:', compressedImage.length, 'chars');
          onPictureChange(compressedImage);
        } catch (error) {
          console.error('❌ Error compressing image:', error);
          alert('Failed to process image. Please try another image.');
        }
      };
      reader.onerror = (error) => {
        console.error('❌ Error reading file:', error);
        alert('Failed to read file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
    // Reset input to allow same file selection
    event.target.value = '';
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6"> 
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0"> 
        <img
          src={userData.profilePicture}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-2 border-gray-100" 
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/f0e0d0/800000?text=JL" }}
        />
        <button
          onClick={handleCameraClick}
          className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full text-black border-2 border-gray-300 hover:bg-gray-100 transition duration-150"
          aria-label="Change profile picture"
        >
          <FiCamera size={14} style={{ color: ACCENT_COLOR }} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{userData.fullName}</h1> 
        <p className="text-base sm:text-lg font-medium mt-1" style={{ color: ACCENT_COLOR }}>@{userData.username}</p> 
        <p className="text-gray-500 text-sm sm:text-base mt-1">{userData.location}</p>
      </div>
    </div>
  );
};

const ProfileSectionData = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"> 
    {children}
  </div>
);

const ProfileItem = ({ label, value }) => (
  <div className="flex flex-col">
    <p className="text-xs sm:text-sm font-normal text-gray-500 mb-1">{label}</p> 
    <p className="text-sm sm:text-base text-gray-900 font-semibold break-words">{value}</p> 
  </div>
);

export const ProfileScreen = ({ navigateToHome }) => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize userData from Redux user state
  const [userData, setUserData] = useState(() => {
    if (user) {
      const { firstName, lastName } = parseFullName(user.full_name);
      return {
        fullName: user.full_name || '',
        username: user.username || '',
        location: user.location || 'Not specified',
        profilePicture: user.profile_picture || `https://placehold.co/100x100/f0e0d0/800000?text=${getInitials(user.full_name)}`,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: user.date_of_birth || '',
        email: user.email || '',
        phoneNumber: user.phone_number || '',
        country: user.country || '',
        city: user.city || '',
        postalCode: user.postal_code || '',
      };
    }
    return {};
  });

  // No useEffect sync - only use initial state from Redux
  // Updates only happen through handleSave and Save Changes button

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleSave = useCallback((newFields) => {
    console.log('✏️ Handling field updates:', newFields);
    
    setUserData(prev => {
      const updatedData = { ...prev, ...newFields };
      
      // Update fullName if firstName or lastName changed
      if (newFields.firstName || newFields.lastName) {
          updatedData.fullName = `${newFields.firstName || prev.firstName} ${newFields.lastName || prev.lastName}`;
      }
      
      // Update location if city or country changed
      if (newFields.city || newFields.country) {
          const newCity = newFields.city || prev.city;
          const newCountry = newFields.country || prev.country;
          updatedData.location = `${newCity}, ${newCountry}`;
      }
      
      return updatedData;
    });

    setHasChanges(true);
  }, []);

  const handlePictureChange = useCallback(async (newUrl) => {
    console.log('📸 Profile picture changed, saving to backend...');
    setIsSaving(true);
    
    try {
      // Update profile picture via API
      const response = await updateUserProfile(token, { profile_picture: newUrl });
      
      if (response.success && response.data) {
        console.log('✅ Profile picture saved, updating state...');
        
        // Update Redux
        dispatch(updateUser(response.data));
        
        // Update local state
        setUserData(prev => ({ 
          ...prev, 
          profilePicture: response.data.profile_picture || newUrl 
        }));
        
        console.log('✨ Profile picture updated successfully');
      }
    } catch (error) {
      console.error('❌ Error updating profile picture:', error);
      alert('Failed to update profile picture. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [token, dispatch]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const personalFields = useMemo(() => ([
    { label: "First Name", name: "firstName", type: "text", required: true },
    { label: "Last Name", name: "lastName", type: "text", required: true },
    { label: "Date of Birth", name: "dateOfBirth", type: "date", required: true },
    { label: "Email Address", name: "email", type: "email", required: true },
    { label: "Phone Number", name: "phoneNumber", type: "tel", required: false },
  ]), []);

  const personalData = useMemo(() => ({
    firstName: userData.firstName,
    lastName: userData.lastName,
    dateOfBirth: userData.dateOfBirth,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
  }), [userData]);

  const addressFields = useMemo(() => ([
    { label: "Country", name: "country", type: "text", required: true },
    { label: "City", name: "city", type: "text", required: true },
    { label: "Postal Code", name: "postalCode", type: "text", required: true },
  ]), []);

  const addressData = useMemo(() => ({
    country: userData.country,
    city: userData.city,
    postalCode: userData.postalCode,
  }), [userData]);

  return (
    <div className="min-h-screen font-sans bg-white" style={{ fontFamily: "'Inter', 'Arial', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-300 py-3 sticky top-0 z-10"> 
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 sm:gap-4"> 
          <button
            onClick={handleBackToHome}
            className="p-1 text-black hover:bg-gray-100 rounded-full transition"
            aria-label="Go back to Home"
          >
            <FiChevronLeft size={30} style={{ color: ACCENT_COLOR }} />
          </button>
          <h1 
            className="text-xl sm:text-2xl font-extrabold tracking-wider uppercase" 
            style={{ color: ACCENT_COLOR, fontFamily: "'Inter', 'Arial', sans-serif" }}
          >
            PROFILE
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="bg-white p-4 sm:p-6 rounded-lg border mb-6" style={{ borderColor: ACCENT_COLOR }}> 
            <ProfileHeader userData={userData} onPictureChange={handlePictureChange} />
        </div>

        {/* Personal Information Section */}
        <SectionCard title="Personal Information" onEdit={() => openModal('personal')}>
          <ProfileSectionData>
            <ProfileItem label="First Name" value={userData.firstName} />
            <ProfileItem label="Last Name" value={userData.lastName} />
            <ProfileItem label="Date of Birth" value={userData.dateOfBirth} />
            <ProfileItem label="Email Address" value={userData.email} />
            <ProfileItem label="Phone Number" value={userData.phoneNumber || '-'} />
          </ProfileSectionData>
        </SectionCard>

        {/* Address Section */}
        <SectionCard title="Address" onEdit={() => openModal('address')}>
          <ProfileSectionData>
            <ProfileItem label="Country" value={userData.country} />
            <ProfileItem label="City" value={userData.city} />
            <ProfileItem label="Postal Code" value={userData.postalCode} />
          </ProfileSectionData>
        </SectionCard>

        {/* Save/Discard Buttons - Always visible but disabled when no changes */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
          <Button 
            onClick={() => {
              console.log('🔙 Discarding changes, reverting to Redux state');
              // Revert to Redux user state
              if (user) {
                const { firstName, lastName } = parseFullName(user.full_name);
                const revertedData = {
                  fullName: user.full_name || '',
                  username: user.username || '',
                  location: user.location || (user.city && user.country ? `${user.city}, ${user.country}` : 'Not specified'),
                  profilePicture: user.profile_picture || `https://placehold.co/100x100/f0e0d0/800000?text=${getInitials(user.full_name)}`,
                  firstName: firstName,
                  lastName: lastName,
                  dateOfBirth: user.date_of_birth || '',
                  email: user.email || '',
                  phoneNumber: user.phone_number || '',
                  country: user.country || '',
                  city: user.city || '',
                  postalCode: user.postal_code || '',
                };
                setUserData(revertedData);
              }
              setHasChanges(false);
              console.log('✅ Changes discarded');
            }}
            disabled={!hasChanges}
            className="w-full sm:w-auto"
          >
            Discard Changes
          </Button>
            <Button 
              onClick={async () => {
                setIsSaving(true);
                try {
                  // Prepare data untuk backend
                  const profileData = {
                    full_name: userData.fullName,
                    date_of_birth: userData.dateOfBirth,
                    email: userData.email,
                    phone_number: userData.phoneNumber || null,
                    country: userData.country,
                    city: userData.city,
                    postal_code: userData.postalCode,
                    location: userData.location,
                  };

                  // Only include profile_picture if it's not a placeholder
                  if (userData.profilePicture && !userData.profilePicture.includes('placehold.co')) {
                    profileData.profile_picture = userData.profilePicture;
                  }

                  console.log('💾 Saving profile data...', profileData);

                  // Save to backend
                  const response = await updateUserProfile(token, profileData);
                  
                  console.log('✅ Backend response:', response);
                  
                  // Update Redux store dengan data dari backend
                  if (response.success && response.data) {
                    console.log('🔄 Updating Redux store and local state...');
                    
                    // Update Redux store
                    dispatch(updateUser(response.data));
                    
                    // Update local state to match backend response
                    const { firstName, lastName } = parseFullName(response.data.full_name);
                    const updatedLocalData = {
                      fullName: response.data.full_name || '',
                      username: response.data.username || '',
                      location: response.data.location || (response.data.city && response.data.country ? `${response.data.city}, ${response.data.country}` : 'Not specified'),
                      profilePicture: response.data.profile_picture || `https://placehold.co/100x100/f0e0d0/800000?text=${getInitials(response.data.full_name)}`,
                      firstName: firstName,
                      lastName: lastName,
                      dateOfBirth: response.data.date_of_birth || '',
                      email: response.data.email || '',
                      phoneNumber: response.data.phone_number || '',
                      country: response.data.country || '',
                      city: response.data.city || '',
                      postalCode: response.data.postal_code || '',
                    };
                    
                    console.log('✨ Setting userData to:', updatedLocalData);
                    setUserData(updatedLocalData);
                    
                    // Reset hasChanges flag
                    console.log('🏁 Resetting hasChanges flag');
                    setHasChanges(false);
                  }
                  
                  // Show success message
                  alert('✅ Profile updated successfully!');
                  
                  console.log('🎉 Save complete');
                  
                } catch (error) {
                  console.error('❌ Error saving profile:', error);
                  const errorMessage = error.response?.data?.message || error.message || 'Failed to save profile';
                  alert(`❌ Error: ${errorMessage}`);
                } finally {
                  setIsSaving(false);
                }
              }}
              disabled={!hasChanges || isSaving}
              style={{ 
                backgroundColor: ACCENT_COLOR, 
                color: 'white', 
                borderColor: ACCENT_COLOR,
              }}
              className="hover:opacity-90 disabled:opacity-50 w-full sm:w-auto"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
      </main>

      {/* Modals */}
      {modalType === 'personal' && (
        <EditModal
          title="Edit Personal Information"
          fields={personalFields}
          initialData={personalData}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {modalType === 'address' && (
        <EditModal
          title="Edit Address"
          fields={addressFields}
          initialData={addressData}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

// Export as default for use in the App routing
export default ProfileScreen;