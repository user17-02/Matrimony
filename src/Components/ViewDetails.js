import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './ViewDetails.css';

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="view-details-container">
      <div className="profile-card">
        <img src={user.image} alt={user.name} className="profile-image" />
        <h2 className="profile-name">{user.name}</h2>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>State:</strong> {user.state}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p><strong>Height:</strong> {user.height} cm</p>
        <p><strong>Weight:</strong> {user.weight} kg</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Complexion:</strong> {user.complexion}</p>
        <p><strong>Body Type:</strong> {user.bodyType}</p>
        <p><strong>Profession:</strong> {user.job}</p>
        <p><strong>Qualification:</strong> {user.qualification}</p>
        <p><strong>Company:</strong> {user.company}</p>
        <p><strong>Income:</strong> ₹{user.income}</p>
        <p><strong>Education Details:</strong> {user.educationDetails}</p>
        <p><strong>Religion:</strong> {user.religion}</p>
        <p><strong>Caste:</strong> {user.caste}</p>
        <p><strong>Mother Tongue:</strong> {user.motherTongue}</p>
        <p><strong>Marital Status:</strong> {user.maritalStatus}</p>
        <p><strong>Is Divorced:</strong> {user.isDivorced}</p>
        <p><strong>Diet:</strong> {user.diet}</p>
        <p><strong>Smoking:</strong> {user.smoking}</p>
        <p><strong>Drinking:</strong> {user.drinking}</p>
        <p><strong>Hobbies:</strong> {user.hobbies}</p>
        <p><strong>Interests:</strong> {user.interests}</p>
        <p><strong>About Me:</strong> {user.aboutMe}</p>
        <br />
        <h3>Partner Preferences</h3>
<p><strong>Marital Status:</strong> {user.partnerPreferences?.maritalStatus?.join(', ') || 'N/A'}</p>
<p><strong>Age Range:</strong> {user.partnerPreferences?.ageRange?.join(' - ') || 'N/A'}</p>
<p><strong>Height Range:</strong> {user.partnerPreferences?.heightRange?.join(' - ') || 'N/A'} cm</p>
<p><strong>Complexion:</strong> {user.partnerPreferences?.complexion || 'N/A'}</p>
<p><strong>Profession:</strong> {user.partnerPreferences?.profession || 'N/A'}</p>
<p><strong>Religion:</strong> {user.partnerPreferences?.religion || 'N/A'}</p>
<p><strong>Caste:</strong> {user.partnerPreferences?.caste || 'N/A'}</p>
<p><strong>Location:</strong> {user.partnerPreferences?.location || 'N/A'}</p>

      </div>

      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ViewDetails;
