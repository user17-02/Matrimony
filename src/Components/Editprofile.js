import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    religion: '',
    caste: '',
    motherTongue: '',
    nationality: '',
    height: '',
    weight: '',
    complexion: '',
    bodyType: '',
    maritalStatus: 'Never Married',
    isDivorced: false,
    qualification: '',
    profession: '',
    company: '',
    income: '',
    educationDetails: '',
    address: '',
    city: '',
    state: '',
    country: '',
    diet: '',
    smoking: '',
    drinking: '',
    hobbies: '',
    interests: '',
    aboutMe: '',
    partnerPreferences: {
      ageRange: '',
      heightRange: '',
      maritalStatus: '',
      religion: '',
      caste: '',
      education: '',
      profession: '',
      location: ''
    }
  });

  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
        const user = res.data;

        setFormData((prev) => ({
          ...prev,
          username: user.username || '',
          email: user.email || '',
          // You can extend this to load other fields as needed
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('partnerPreferences.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        partnerPreferences: {
          ...prev.partnerPreferences,
          [key]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    for (const key in formData) {
      if (key === 'username' || key === 'email' || key === 'partnerPreferences') continue;
      if (typeof formData[key] === 'boolean') continue; // Skip boolean fields
      if (!formData[key] || (typeof formData[key] === 'string' && formData[key].trim() === '')) {
        newErrors[key] = 'This field is required';
      }
    }

    for (const key in formData.partnerPreferences) {
      if (
        !formData.partnerPreferences[key] ||
        formData.partnerPreferences[key].trim() === ''
      ) {
        newErrors['partnerPreferences.' + key] = 'This field is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      const updatedData = {
        ...formData,
        hobbies: formData.hobbies.split(',').map((h) => h.trim()),
        interests: formData.interests.split(',').map((i) => i.trim())
      };
      await axios.put(`http://localhost:5000/api/user/${userId}`, updatedData);
      alert('Profile updated!');
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  const renderError = (field) => {
    if (errors[field]) {
      return <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors[field]}</div>;
    }
    return null;
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Username</label>
        <input type="text" name="username" value={formData.username || ''} readOnly />

        <label>Email</label>
        <input type="email" name="email" value={formData.email || ''} readOnly />

        <label>Age *</label>
        <input type="number" name="age" value={formData.age || ''} onChange={handleChange} required />
        {renderError('age')}

        <label>Gender *</label>
        <select name="gender" value={formData.gender || ''} onChange={handleChange} required>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        {renderError('gender')}

        <label>Phone *</label>
        <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} required />
        {renderError('phone')}

        <label>Religion *</label>
        <input type="text" name="religion" value={formData.religion || ''} onChange={handleChange} required />
        {renderError('religion')}

        <label>Caste *</label>
        <input type="text" name="caste" value={formData.caste || ''} onChange={handleChange} required />
        {renderError('caste')}

        <label>Mother Tongue *</label>
        <input type="text" name="motherTongue" value={formData.motherTongue || ''} onChange={handleChange} required />
        {renderError('motherTongue')}

        <label>Nationality *</label>
        <input type="text" name="nationality" value={formData.nationality || ''} onChange={handleChange} required />
        {renderError('nationality')}

        <label>Height (cm) *</label>
        <input type="number" name="height" value={formData.height || ''} onChange={handleChange} required />
        {renderError('height')}

        <label>Weight (kg) *</label>
        <input type="number" name="weight" value={formData.weight || ''} onChange={handleChange} required />
        {renderError('weight')}

        <label>Complexion *</label>
        <select name="complexion" value={formData.complexion || ''} onChange={handleChange} required>
          <option value="">Select</option>
          <option>Fair</option>
          <option>Wheatish</option>
          <option>Dark</option>
        </select>
        {renderError('complexion')}

        <label>Body Type *</label>
        <select name="bodyType" value={formData.bodyType || ''} onChange={handleChange} required>
          <option value="">Select</option>
          <option>Slim</option>
          <option>Average</option>
          <option>Athletic</option>
          <option>Heavy</option>
        </select>
        {renderError('bodyType')}

        <label>Qualification *</label>
        <input type="text" name="qualification" value={formData.qualification || ''} onChange={handleChange} required />
        {renderError('qualification')}

        <label>Profession *</label>
        <input type="text" name="profession" value={formData.profession || ''} onChange={handleChange} required />
        {renderError('profession')}

        <label>Company *</label>
        <input type="text" name="company" value={formData.company || ''} onChange={handleChange} required />
        {renderError('company')}

        <label>Income *</label>
        <input type="text" name="income" value={formData.income || ''} onChange={handleChange} required />
        {renderError('income')}

        <label>Education Details *</label>
        <input type="text" name="educationDetails" value={formData.educationDetails || ''} onChange={handleChange} required />
        {renderError('educationDetails')}

        <label>Address *</label>
        <input type="text" name="address" value={formData.address || ''} onChange={handleChange} required />
        {renderError('address')}

        <label>City *</label>
        <input type="text" name="city" value={formData.city || ''} onChange={handleChange} required />
        {renderError('city')}

        <label>State *</label>
        <input type="text" name="state" value={formData.state || ''} onChange={handleChange} required />
        {renderError('state')}

        <label>Country *</label>
        <input type="text" name="country" value={formData.country || ''} onChange={handleChange} required />
        {renderError('country')}

        <label>Diet *</label>
        <select name="diet" value={formData.diet || ''} onChange={handleChange} required>
          <option value="">Select</option>
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
          <option>Eggetarian</option>
          <option>Vegan</option>
        </select>
        {renderError('diet')}

        <label>Smoking *</label>
        <select name="smoking" value={formData.smoking || ''} onChange={handleChange} required>
          <option value="">Select</option>
          <option>Yes</option>
          <option>No</option>
          <option>Occasionally</option>
        </select>
        {renderError('smoking')}

        <label>Drinking *</label>
        <select name="drinking" value={formData.drinking || ''} onChange={handleChange} required>
          <option value="">Select</option>
          <option>Yes</option>
          <option>No</option>
          <option>Occasionally</option>
        </select>
        {renderError('drinking')}

        <label>Hobbies (comma separated) *</label>
        <input type="text" name="hobbies" value={formData.hobbies || ''} onChange={handleChange} required />
        {renderError('hobbies')}

        <label>Interests (comma separated) *</label>
        <input type="text" name="interests" value={formData.interests || ''} onChange={handleChange} required />
        {renderError('interests')}

        <label>About Me *</label>
        <textarea name="aboutMe" value={formData.aboutMe || ''} onChange={handleChange} required />
        {renderError('aboutMe')}

        <h3>Partner Preferences *</h3>

        <label>Preferred Age Range</label>
        <input type="text" name="partnerPreferences.ageRange" value={formData.partnerPreferences.ageRange || ''} onChange={handleChange} required />
        {renderError('partnerPreferences.ageRange')}

        <label>Preferred Height Range</label>
        <input type="text" name="partnerPreferences.heightRange" value={formData.partnerPreferences.heightRange || ''} onChange={handleChange} required />
        {renderError('partnerPreferences.heightRange')}

        <label>Preferred Marital Status</label>
        <input type="text" name="partnerPreferences.maritalStatus" value={formData.partnerPreferences.maritalStatus || ''} onChange={handleChange} required />
        {renderError('partnerPreferences.maritalStatus')}

        <label>Preferred Religion</label>
        <input type="text" name="partnerPreferences.religion" value={formData.partnerPreferences.religion || ''} onChange={handleChange} required />
        {renderError('partnerPreferences.religion')}

        <label>Preferred Caste</label>
        <input type="text" name="partnerPreferences.caste" value={formData.partnerPreferences.caste || ''} onChange={handleChange} required />
        {renderError('partnerPreferences.caste')}

        <label>Preferred Education</label>
        <input type="text" name="partnerPreferences.education" value={formData.partnerPreferences.education || ''} onChange={handleChange} required />
        {renderError('partnerPreferences.education')}

        <label>Preferred Profession</label>
        <input type="text" name="partnerPreferences.profession" value={formData.partnerPreferences.profession || ''} onChange={handleChange} required />
        {renderError('partnerPreferences.profession')}

        <label>Preferred Location</label>
        <input type="text" name="partnerPreferences.location" value={formData.partnerPreferences.location || ''} onChange={handleChange} required />
        {renderError('partnerPreferences.location')}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
