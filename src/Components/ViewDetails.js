import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ViewDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        console.log("Fetched user data:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{user.name}'s Profile</h2>
      <div className="row">
        <div className="col-md-5">
          {user.image && (
            <img
              src={user.image}
              alt={user.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <div className="col-md-7">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>State:</strong> {user.state}</p>
          <p><strong>Country:</strong> {user.country}</p>
          <p><strong>Height:</strong> {user.height} cm</p>
          <p><strong>Weight:</strong> {user.weight}</p>
          <p><strong>Complexion:</strong> {user.complexion}</p>
          <p><strong>Body Type:</strong> {user.bodyType}</p>
          <p><strong>Profession:</strong> {user.profession}</p>
          <p><strong>Company:</strong> {user.company}</p>
          <p><strong>Qualification:</strong> {user.qualification}</p>
          <p><strong>Income:</strong> {user.income}</p>
          <p><strong>Education Details:</strong> {user.educationDetails}</p>
          <p><strong>Religion:</strong> {user.religion}</p>
          <p><strong>Caste:</strong> {user.caste}</p>
          <p><strong>Mother Tongue:</strong> {user.motherTongue}</p>
          <p><strong>Marital Status:</strong> {user.maritalStatus}</p>
          <p><strong>Is Divorced:</strong> {user.isDivorced ? "Yes" : "No"}</p>
          <p><strong>Diet:</strong> {user.diet}</p>
          <p><strong>Smoking:</strong> {user.smoking}</p>
          <p><strong>Drinking:</strong> {user.drinking}</p>
          <p><strong>Hobbies:</strong> {user.hobbies?.join(", ")}</p>
          <p><strong>Interests:</strong> {user.interests?.join(", ")}</p>
          <p><strong>About Me:</strong> {user.aboutMe}</p>
          <p><strong>Profile Type:</strong> {user.type}</p>

          {user.partnerPreferences && (
            <>
              <hr />
              <h5>Partner Preferences</h5>
              <p><strong>Age Range:</strong> {user.partnerPreferences.ageRange?.join(" - ")}</p>
              <p><strong>Height Range:</strong> {user.partnerPreferences.heightRange?.join(" - ")}</p>
              <p><strong>Profession:</strong> {user.partnerPreferences.profession}</p>
              <p><strong>City/Location:</strong> {user.partnerPreferences.location}</p>
              <p><strong>Complexion:</strong> {user.partnerPreferences.complexion}</p>
              <p><strong>Religion:</strong> {user.partnerPreferences.religion}</p>
              <p><strong>Caste:</strong> {user.partnerPreferences.caste}</p>
            </>
          )}

          <Link to="/all-profiles" className="btn btn-secondary mt-3">Back to Profiles</Link>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
