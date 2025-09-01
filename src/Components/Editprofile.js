import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

const parseRange = (raw) => {
  if (Array.isArray(raw)) return raw;
  if (typeof raw !== "string") return [];
  return raw.split(/[-,]/).map(n => Number(n.trim())).filter(n => !isNaN(n));
};

const EditProfile = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const storedUserParsed = storedUser ? JSON.parse(storedUser) : null;
  const userId = storedUserParsed?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: storedUserParsed?.email || "",
    age: "",
    city: "",
    state: "",
    country: "",
    height: "",
    weight: "",
    profession: "",
    qualification: "",
    company: "",
    income: "",
    educationDetails: "",
    gender: "",
    complexion: "",
    // bodyType: "", // hidden
    religion: "",
    caste: "",
    motherTongue: "",
    maritalStatus: "",
    diet: "",
    // smoking: "", // hidden
    // drinking: "", // hidden
    hobbies: "",
    interests: "",
    aboutMe: "",
    image: "",
    partnerPreferences: {
      ageRange: "",
      heightRange: "",
      complexion: "",
      profession: "",
      religion: "",
      caste: "",
      location: ""
    }
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user data
  const loadUser = async () => {
    if (!userId || !token) {
      setMessage("User not logged in.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const u = res.data;
      setFormData({
        ...formData,
        ...u,
        hobbies: Array.isArray(u.hobbies) ? u.hobbies.join(", ") : u.hobbies || "",
        interests: Array.isArray(u.interests) ? u.interests.join(", ") : u.interests || "",
        partnerPreferences: {
          ageRange: Array.isArray(u.partnerPreferences?.ageRange) ? u.partnerPreferences.ageRange.join("-") : u.partnerPreferences?.ageRange || "",
          heightRange: Array.isArray(u.partnerPreferences?.heightRange) ? u.partnerPreferences.heightRange.join("-") : u.partnerPreferences?.heightRange || "",
          complexion: u.partnerPreferences?.complexion || "",
          profession: u.partnerPreferences?.profession || "",
          religion: u.partnerPreferences?.religion || "",
          caste: u.partnerPreferences?.caste || "",
          location: u.partnerPreferences?.location || ""
        }
      });
      setPreviewImage(u.image || null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      return;
    }

    if (name.startsWith("partnerPreferences.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({ ...prev, partnerPreferences: { ...prev.partnerPreferences, [key]: value } }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Main required fields (hidden fields removed)
    for (let key of [
      "name","email","age","city","state","country","height","weight",
      "profession","qualification","company","income","educationDetails",
      "gender","complexion","religion","caste","motherTongue",
      "maritalStatus","diet","hobbies","interests","aboutMe","image"
    ]) {
      if (!formData[key] || formData[key].toString().trim() === "") return `${key} is required`;
    }

    // Partner Preferences
    for (let key of ["ageRange","heightRange","complexion","profession","religion","caste","location"]) {
      if (!formData.partnerPreferences[key] || formData.partnerPreferences[key].toString().trim() === "") return `${key} is required`;
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setMessage(`❌ ${validationError}`);
      return;
    }

    const payload = {
      ...formData,
      gender: capitalize(formData.gender),
      complexion: capitalize(formData.complexion),
      // bodyType: capitalize(formData.bodyType), // hidden
      maritalStatus: capitalize(formData.maritalStatus),
      diet: capitalize(formData.diet),
      hobbies: formData.hobbies.split(",").map(h => h.trim()).filter(Boolean),
      interests: formData.interests.split(",").map(i => i.trim()).filter(Boolean),
      partnerPreferences: {
        ageRange: parseRange(formData.partnerPreferences.ageRange),
        heightRange: parseRange(formData.partnerPreferences.heightRange),
        complexion: capitalize(formData.partnerPreferences.complexion),
        profession: formData.partnerPreferences.profession,
        religion: formData.partnerPreferences.religion,
        caste: formData.partnerPreferences.caste,
        location: formData.partnerPreferences.location
      }
    };

    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:5000/api/user/${userId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      setMessage("✅ Profile updated successfully!");
      navigate("/profiles");
    } catch (err) {
      console.error(err);
      const errMsg = err?.response?.data?.message || "Update failed";
      setMessage(`❌ ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 900 }}>
      <h2>Edit Profile</h2>
      {message && <div style={{
        padding: "10px",
        marginBottom: 12,
        borderRadius: 4,
        background: message.startsWith("✅") ? "#d1e7dd" : "#f8d7da",
        color: message.startsWith("✅") ? "#0f5132" : "#842029"
      }}>{message}</div>}
      {loading && <div>Loading...</div>}

      <form onSubmit={handleSubmit} className="card p-4" noValidate>
        {/* Name & Email */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} readOnly />
        </div>

        {/* Main Fields */}
        {[
          "age","city","state","country","height","weight","profession","qualification",
          "company","income","educationDetails","gender","religion","caste","motherTongue",
          "hobbies","interests","aboutMe"
        ].map(key => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={["age","height","weight"].includes(key) ? "number" : "text"}
              name={key}
              className="form-control"
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* Select Dropdowns */}
        <div className="mb-3">
          <label className="form-label">Complexion</label>
          <select className="form-select" name="complexion" value={formData.complexion} onChange={handleChange} required>
            <option value="">Select Complexion</option>
            <option value="Fair">Fair</option>
            <option value="Wheatish">Wheatish</option>
            <option value="Dusky">Dusky</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        {/* Body Type hidden */}
        {/* <div className="mb-3">
          <label className="form-label">Body Type</label>
          <select className="form-select" name="bodyType" value={formData.bodyType} onChange={handleChange} required>
            <option value="">Select Body Type</option>
            <option value="Slim">Slim</option>
            <option value="Athletic">Athletic</option>
            <option value="Average">Average</option>
            <option value="Heavy">Heavy</option>
          </select>
        </div> */}

        <div className="mb-3">
          <label className="form-label">Marital Status</label>
          <select className="form-select" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
            <option value="">Select Marital Status</option>
            <option value="Never Married">Single</option>
            <option value="Divorced">Divorced</option>
            {/* <option value="Widowed">Widowed</option> */}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Diet</label>
          <select className="form-select" name="diet" value={formData.diet} onChange={handleChange} required>
            <option value="">Select Diet</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Eggetarian">Eggetarian</option>
          </select>
        </div>

        {/* Profile Image */}
        <div className="mb-3">
          <label className="form-label">Profile Image</label>
          <input type="file" name="image" className="form-control" accept="image/*" onChange={handleChange} required />
          {previewImage && <img src={previewImage} alt="Preview" className="mt-2" style={{ width: "150px", height: "150px", objectFit: "cover" }} />}
        </div>

        {/* Partner Preferences */}
        <h5 className="mt-4">Partner Preferences</h5>
        {Object.keys(formData.partnerPreferences).map(key => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input type="text" name={`partnerPreferences.${key}`} className="form-control" value={formData.partnerPreferences[key]} onChange={handleChange} required />
          </div>
        ))}

        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
