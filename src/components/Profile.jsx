const Edit2Icon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
);

const CameraIcon = ({ size = 14, color = 'currentColor', className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 4h1.5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1.5"/>
    <circle cx="12" cy="13" r="3"/>
    <path d="M16 16v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1"/>
  </svg>
);

const ChevronLeftIcon = ({ size = 30, color = 'currentColor', className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api/profileApi';
import { useSelector } from 'react-redux';

const ACCENT_COLOR = '#800000';

const USED_USERNAMES = ['admin', 'jihanlarasti2', 'jihanlarasti3', 'jihanlarasti4'];

const checkUsernameAvailability = async (newUsername) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(!USED_USERNAMES.includes(newUsername.toLowerCase()));
    }, 500);
  });
};

const Button = ({ children, onClick, className = '', style }) => {
  const baseStyle = "px-4 py-1 font-medium transition duration-200";
  return (
    <button
      onClick={onClick}
      style={{
        color: ACCENT_COLOR,
        borderColor: ACCENT_COLOR,
        backgroundColor: 'white',
        ...style,
      }}
      className={`${baseStyle} border rounded-lg hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-red-400 ${className}`}
    >
      {children}
    </button>
  );
};

const InputField = ({ label, id, name, value, onChange, type = 'text', error = null, onBlur }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`mt-1 block w-full border border-gray-300 p-2 text-gray-800 rounded-lg
        focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500
        ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const SectionCard = ({ title, children, onEdit }) => (
  <div className={`bg-white p-0 rounded-none border mb-6 mx-4 sm:mx-0`} style={{ borderColor: ACCENT_COLOR }}>
    <div className="flex justify-between items-center px-6 py-4 border-b" style={{ borderColor: ACCENT_COLOR }}>
      <h2 className="text-xl font-bold text-gray-800" style={{ color: ACCENT_COLOR }}>{title}</h2>
      {onEdit && (
        <Button onClick={onEdit} className="flex items-center space-x-1 py-1 px-3">
          <span>Edit</span>
          <Edit2Icon size={16} />
        </Button>
      )}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const EditModal = ({ title, fields, initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

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

  const validate = () => {
    let newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });

    if (errors.username && errors.username !== 'Checking availability...' && !newErrors.username) {
        newErrors.username = errors.username;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && errors.username !== 'Checking availability...';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSaving(true);
      setTimeout(() => {
        onSave(formData);
        setIsSaving(false);
        onClose();
      }, 800);
    }
  };

  const isFormValid = useMemo(() => {
    const requiredFieldNames = fields.filter(f => f.required).map(f => f.name);
    const requiredFieldsFilled = requiredFieldNames.every(name => formData[name] && formData[name].trim() !== '');
    const noValidationErrors = Object.values(errors).every(e => !e);

    return !isSaving && requiredFieldsFilled && noValidationErrors;
  }, [isSaving, errors, formData, fields]);


  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-filter backdrop-blur-sm bg-white bg-opacity-70">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl border border-gray-200">
        <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: ACCENT_COLOR }}>
          <h3 className="text-xl font-bold text-gray-800" style={{ color: ACCENT_COLOR }}>{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <ChevronLeftIcon size={20} style={{ color: ACCENT_COLOR }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
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
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" onClick={onClose} className="border">
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              style={{ 
                  backgroundColor: ACCENT_COLOR, 
                  color: 'white', 
                  borderColor: ACCENT_COLOR,
              }}
              className="hover:opacity-90 disabled:opacity-50"
              disabled={!isFormValid}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileHeader = ({ userData, onPictureChange }) => {
  const fileInputRef = React.useRef(null);

  const handleCameraClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onPictureChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center space-x-6"> 
      <div className="relative w-20 h-20"> 
        <img
          src={userData.profilePicture}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border border-gray-100" 
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/f0e0d0/800000?text=JL" }}
        />
        <button
          onClick={handleCameraClick}
          className="absolute bottom-0 right-0 p-1 bg-white rounded-full text-black border border-gray-300 hover:bg-gray-100 transition duration-150"
          aria-label="Change profile picture"
        >
          <CameraIcon size={14} style={{ color: ACCENT_COLOR }} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">{userData.fullName}</h1> 
        <p className="text-base font-medium mt-1" style={{ color: ACCENT_COLOR }}>@{userData.username}</p> 
        <p className="text-gray-500 text-sm mt-0.5">{userData.location}</p>
      </div>
    </div>
  );
};

const ProfileSectionData = ({ children }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6"> 
    {children}
  </div>
);

const ProfileItem = ({ label, value }) => (
  <div className="flex flex-col">
    <p className="text-sm font-normal text-gray-500 mb-1">{label}</p> 
    <p className="text-base text-gray-900 font-semibold">{value}</p> 
  </div>
);

export const ProfileScreen = ({ navigateToHome }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState(null);
  const token = useSelector((state) => state.auth.token);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserProfile(token);
        
        if (response.success && response.data) {
          const user = response.data;
          
          // Transform API data to match component state structure
          const transformedData = {
            fullName: user.full_name || '',
            username: user.username || '',
            location: user.location || `${user.city || ''}, ${user.country || ''}`,
            profilePicture: user.profile_picture || "https://placehold.co/100x100/f0e0d0/800000?text=User",
            firstName: user.full_name ? user.full_name.split(' ')[0] : '',
            lastName: user.full_name ? user.full_name.split(' ').slice(1).join(' ') : '',
            dateOfBirth: user.date_of_birth || '',
            email: user.email || '',
            phoneNumber: user.phone_number || '',
            country: user.country || '',
            city: user.city || '',
            postalCode: user.postal_code || '',
          };
          
          setUserData(transformedData);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleSave = useCallback(async (newFields) => {
    try {
      // Prepare data for API
      const updateData = {};
      
      // Map frontend field names to backend field names
      if (newFields.firstName !== undefined || newFields.lastName !== undefined) {
        const firstName = newFields.firstName || userData.firstName;
        const lastName = newFields.lastName || userData.lastName;
        updateData.full_name = `${firstName} ${lastName}`.trim();
      }
      
      if (newFields.username !== undefined) {
        updateData.username = newFields.username;
      }
      
      if (newFields.dateOfBirth !== undefined) {
        updateData.date_of_birth = newFields.dateOfBirth;
      }
      
      if (newFields.email !== undefined) {
        updateData.email = newFields.email;
      }
      
      if (newFields.phoneNumber !== undefined) {
        updateData.phone_number = newFields.phoneNumber;
      }
      
      if (newFields.country !== undefined) {
        updateData.country = newFields.country;
      }
      
      if (newFields.city !== undefined) {
        updateData.city = newFields.city;
      }
      
      if (newFields.postalCode !== undefined) {
        updateData.postal_code = newFields.postalCode;
      }
      
      // Update location if city or country changed
      if (newFields.city || newFields.country) {
        const city = newFields.city || userData.city;
        const country = newFields.country || userData.country;
        updateData.location = `${city}, ${country}`;
      }

      // Call API to update profile
      const response = await updateUserProfile(token, updateData);
      
      if (response.success && response.data) {
        const user = response.data;
        
        // Update local state with fresh data from backend
        const transformedData = {
          fullName: user.full_name || '',
          username: user.username || '',
          location: user.location || `${user.city || ''}, ${user.country || ''}`,
          profilePicture: user.profile_picture || userData.profilePicture,
          firstName: user.full_name ? user.full_name.split(' ')[0] : '',
          lastName: user.full_name ? user.full_name.split(' ').slice(1).join(' ') : '',
          dateOfBirth: user.date_of_birth || '',
          email: user.email || '',
          phoneNumber: user.phone_number || '',
          country: user.country || '',
          city: user.city || '',
          postalCode: user.postal_code || '',
        };
        
        setUserData(transformedData);
        console.log('Profile updated successfully');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  }, [token, userData]);

  const handlePictureChange = useCallback(async (newUrl) => {
    try {
      // Update profile picture via API
      const response = await updateUserProfile(token, { profile_picture: newUrl });
      
      if (response.success && response.data) {
        setUserData(prev => ({ ...prev, profilePicture: response.data.profile_picture || newUrl }));
        console.log("Profile picture updated successfully.");
      }
    } catch (err) {
      console.error('Error updating profile picture:', err);
      alert('Failed to update profile picture. Please try again.');
    }
  }, [token]);


  const personalFields = useMemo(() => ([
    { label: "First Name", name: "firstName", type: "text", required: true },
    { label: "Last Name", name: "lastName", type: "text", required: true },
    { label: "Date of Birth", name: "dateOfBirth", type: "date", required: true },
    { label: "Email Address", name: "email", type: "email", required: true },
    { label: "Phone Number", name: "phoneNumber", type: "tel", required: false },
    { label: "Username", name: "username", type: "text", required: true },
  ]), []);

  const personalData = useMemo(() => ({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    dateOfBirth: userData?.dateOfBirth || '',
    email: userData?.email || '',
    phoneNumber: userData?.phoneNumber || '',
    username: userData?.username || '',
  }), [userData]);

  const addressFields = useMemo(() => ([
    { label: "Country", name: "country", type: "text", required: true },
    { label: "City", name: "city", type: "text", required: true },
    { label: "Postal Code", name: "postalCode", type: "text", required: true },
  ]), []);

  const addressData = useMemo(() => ({
    country: userData?.country || '',
    city: userData?.city || '',
    postalCode: userData?.postalCode || '',
  }), [userData]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: ACCENT_COLOR }}></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Failed to load profile'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: ACCENT_COLOR, color: 'white' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen font-sans bg-white">
      <header className="bg-white border-b border-gray-300 py-3 sticky top-0 z-10"> 
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center space-x-4"> 
          <button
            onClick={navigateToHome} 
            className="p-1 text-black hover:bg-gray-100 rounded-full transition"
            aria-label="Go back to Home"
          >
            <ChevronLeftIcon size={30} style={{ color: ACCENT_COLOR }} />
          </button>
          <h1 
            className="text-2xl font-extrabold tracking-wider uppercase" 
            style={{ color: ACCENT_COLOR }} 
          >
            PROFILE
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-8 px-2 sm:px-6">
        <div className="bg-white p-4 rounded-none border mb-6 mx-2 sm:mx-0" style={{ borderColor: ACCENT_COLOR }}> 
            <ProfileHeader userData={userData} onPictureChange={handlePictureChange} />
        </div>

        <SectionCard title="Personal Information" onEdit={() => openModal('personal')}>
          <ProfileSectionData>
            <ProfileItem label="First Name" value={userData.firstName} />
            <ProfileItem label="Last Name" value={userData.lastName} />
            <ProfileItem label="Date of Birth" value={userData.dateOfBirth} />
            <ProfileItem label="Email Address" value={userData.email} />
            <ProfileItem label="Phone Number" value={userData.phoneNumber || '-'} />
          </ProfileSectionData>
        </SectionCard>

        <SectionCard title="Address" onEdit={() => openModal('address')}>
          <ProfileSectionData>
            <ProfileItem label="Country" value={userData.country} />
            <ProfileItem label="City" value={userData.city} />
            <ProfileItem label="Postal Code" value={userData.postalCode} />
          </ProfileSectionData>
        </SectionCard>
      </main>

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

const App = () => {
    return (
        <div className="min-h-screen">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            body { 
                font-family: 'Inter', Arial, sans-serif;
                background-color: white; 
            }
          `}</style>
          <ProfileScreen navigateToHome={() => console.log('Navigating to Home...')} />
        </div>
    );
}

export default Profile;