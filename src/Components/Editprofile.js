import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const normalizeEnum = (str) => {
  if (!str || typeof str !== "string") return "";
  const s = str.trim().toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const parseRange = (raw) => {
  if (Array.isArray(raw)) return raw;
  if (typeof raw !== "string") return [];
  return raw
    .split(/[-,]/)
    .map((p) => Number(p.trim()))
    .filter((n) => !isNaN(n));
};

const EditProfile = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    bodyType: "",
    religion: "",
    caste: "",
    motherTongue: "",
    maritalStatus: "",
    isDivorced: false,
    diet: "",
    smoking: "",
    drinking: "",
    hobbies: "",
    interests: "",
    aboutMe: "",
    type: "",
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

  const genderOptions = ["Male", "Female", "Other"];
  const complexionOptions = ["Fair", "Wheatish", "Dark"];
  const bodyTypeOptions = ["Slim", "Average", "Athletic", "Heavy"];
  const dietOptions = ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"];
  const yesNoOccasional = ["Yes", "No", "Occasionally"];
  const maritalOptions = ["Never Married", "Divorced", "Widowed", "Separated"];

  const loadUser = async () => {
    if (!userId) {
      setMessage("User not logged in.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/user/${userId}`, {
        headers: { "Cache-Control": "no-cache" }
      });
      const u = res.data;

      setFormData((prev) => ({
        ...prev,
        name: u.name || "",
        email: u.email || "",
        age: u.age || "",
        city: u.city || "",
        state: u.state || "",
        country: u.country || "India",
        height: u.height || "",
        weight: u.weight || "",
        profession: u.profession || "",
        qualification: u.qualification || "",
        company: u.company || "",
        income: u.income || "",
        educationDetails: u.educationDetails || "",
        gender: u.gender || "",
        complexion: u.complexion || "",
        bodyType: u.bodyType || "",
        religion: u.religion || "",
        caste: u.caste || "",
        motherTongue: u.motherTongue || "",
        maritalStatus: u.maritalStatus || "",
        isDivorced: u.isDivorced || false,
        diet: u.diet || "",
        smoking: u.smoking || "",
        drinking: u.drinking || "",
        hobbies: Array.isArray(u.hobbies) ? u.hobbies.join(", ") : (u.hobbies || ""),
        interests: Array.isArray(u.interests) ? u.interests.join(", ") : (u.interests || ""),
        aboutMe: u.aboutMe || "",
        type: u.type || "",
        image: u.image || "",
        partnerPreferences: {
          ageRange: Array.isArray(u.partnerPreferences?.ageRange)
            ? u.partnerPreferences.partnerPreferences?.ageRange?.join("-")
            : u.partnerPreferences?.ageRange || "",
          heightRange: Array.isArray(u.partnerPreferences?.heightRange)
            ? u.partnerPreferences.heightRange.join("-")
            : u.partnerPreferences?.heightRange || "",
          complexion: u.partnerPreferences?.complexion || "",
          profession: u.partnerPreferences?.profession || "",
          religion: u.partnerPreferences?.religion || "",
          caste: u.partnerPreferences?.caste || "",
          location: u.partnerPreferences?.location || ""
        }
      }));
      setPreviewImage(u.image || null);
    } catch (err) {
      console.error("Error fetching user:", err);
      setMessage("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked, files } = e.target;

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      return;
    }

    if (name.startsWith("partnerPreferences.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        partnerPreferences: {
          ...prev.partnerPreferences,
          [key]: value
        }
      }));
      return;
    }

    if (inputType === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("Missing user ID.");
      return;
    }

    const payload = {
      name: formData.name,
      age: formData.age,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      height: formData.height,
      weight: formData.weight,
      profession: formData.profession,
      qualification: formData.qualification,
      company: formData.company,
      income: formData.income,
      educationDetails: formData.educationDetails,
      gender: normalizeEnum(formData.gender),
      complexion: normalizeEnum(formData.complexion),
      bodyType: formData.bodyType,
      religion: formData.religion,
      caste: formData.caste,
      motherTongue: formData.motherTongue,
      maritalStatus: formData.maritalStatus,
      isDivorced: formData.isDivorced,
      diet: formData.diet,
      smoking: formData.smoking,
      drinking: formData.drinking,
      hobbies: formData.hobbies
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),
      interests: formData.interests
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      aboutMe: formData.aboutMe,
      type: formData.type,
      image: formData.image,
      partnerPreferences: {
        ageRange: parseRange(formData.partnerPreferences.ageRange),
        heightRange: parseRange(formData.partnerPreferences.heightRange),
        complexion: normalizeEnum(formData.partnerPreferences.complexion),
        profession: formData.partnerPreferences.profession,
        religion: formData.partnerPreferences.religion,
        caste: formData.partnerPreferences.caste,
        location: formData.partnerPreferences.location
      }
    };

    console.log("Submitting update payload:", payload);
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        payload
      );
      console.log("Update response:", res.data);
      setMessage("✅ Profile updated successfully!");
      // Refresh from backend to ensure sync
      setTimeout(() => {
        navigate("/dashboard/profile?t=" + Date.now());
      }, 500);
    } catch (err) {
      console.error("Update error:", err);
      const errMsg = err?.response?.data?.message || "Update failed";
      setMessage(`❌ ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 900 }}>
      <h2>Edit Profile</h2>

      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: 12,
            borderRadius: 4,
            background: message.startsWith("✅") ? "#d1e7dd" : "#f8d7da",
            color: message.startsWith("✅") ? "#0f5132" : "#842029"
          }}
        >
          {message}
        </div>
      )}

      {loading && <div style={{ marginBottom: 8 }}>Loading...</div>}

      <form onSubmit={handleSubmit} className="card p-4" noValidate>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email (read-only)</label>
              <input name="email" value={formData.email} readOnly className="form-control bg-light" />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                min={18}
                max={100}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input name="city" value={formData.city} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <input name="state" value={formData.state} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Country</label>
              <input name="country" value={formData.country} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Height (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Weight</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Profession</label>
              <input name="profession" value={formData.profession} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Qualification</label>
              <input name="qualification" value={formData.qualification} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Company</label>
              <input name="company" value={formData.company} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Income</label>
              <input name="income" value={formData.income} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Education Details</label>
              <input name="educationDetails" value={formData.educationDetails} onChange={handleChange} className="form-control" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="form-control">
                <option value="">Select Gender</option>
                {genderOptions.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Complexion</label>
              <select name="complexion" value={formData.complexion} onChange={handleChange} className="form-control">
                <option value="">Select Complexion</option>
                {complexionOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Body Type</label>
              <select name="bodyType" value={formData.bodyType} onChange={handleChange} className="form-control">
                <option value="">Select Body Type</option>
                {bodyTypeOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Religion</label>
              <input name="religion" value={formData.religion} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Caste</label>
              <input name="caste" value={formData.caste} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Mother Tongue</label>
              <input name="motherTongue" value={formData.motherTongue} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Marital Status</label>
              <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="form-control">
                <option value="">Select</option>
                {maritalOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" name="isDivorced" checked={formData.isDivorced} onChange={handleChange} className="form-check-input" id="isDivorced" />
              <label className="form-check-label" htmlFor="isDivorced">Is Divorced</label>
            </div>

            <div className="mb-3">
              <label className="form-label">Diet</label>
              <select name="diet" value={formData.diet} onChange={handleChange} className="form-control">
                <option value="">Select Diet</option>
                {dietOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Smoking</label>
              <select name="smoking" value={formData.smoking} onChange={handleChange} className="form-control">
                <option value="">Select</option>
                {yesNoOccasional.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Drinking</label>
              <select name="drinking" value={formData.drinking} onChange={handleChange} className="form-control">
                <option value="">Select</option>
                {yesNoOccasional.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Hobbies</label>
              <input name="hobbies" value={formData.hobbies} onChange={handleChange} className="form-control" placeholder="reading, music" />
            </div>

            <div className="mb-3">
              <label className="form-label">Interests</label>
              <input name="interests" value={formData.interests} onChange={handleChange} className="form-control" placeholder="sports, travel" />
            </div>

            <div className="mb-3">
              <label className="form-label">About Me</label>
              <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} className="form-control" rows={3} />
            </div>

            <div className="mb-3">
              <label className="form-label">Type</label>
              <input name="type" value={formData.type} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Profile Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleChange} className="form-control" />
              {previewImage && (
                <div style={{ marginTop: 8 }}>
                  <img
                    src={previewImage}
                    alt="preview"
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #ccc"
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <hr />

        <h5>Partner Preferences</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Preferred Age Range</label>
              <input
                type="text"
                name="partnerPreferences.ageRange"
                value={formData.partnerPreferences.ageRange}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 25-35"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preferred Height Range</label>
              <input
                type="text"
                name="partnerPreferences.heightRange"
                value={formData.partnerPreferences.heightRange}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 160-180"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preferred Complexion</label>
              <input
                type="text"
                name="partnerPreferences.complexion"
                value={formData.partnerPreferences.complexion}
                onChange={handleChange}
                className="form-control"
                placeholder="Fair/Wheatish/Dark"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Preferred Profession</label>
              <input
                type="text"
                name="partnerPreferences.profession"
                value={formData.partnerPreferences.profession}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Engineer"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preferred Religion</label>
              <input
                type="text"
                name="partnerPreferences.religion"
                value={formData.partnerPreferences.religion}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preferred Caste</label>
              <input
                type="text"
                name="partnerPreferences.caste"
                value={formData.partnerPreferences.caste}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preferred Location</label>
              <input
                type="text"
                name="partnerPreferences.location"
                value={formData.partnerPreferences.location}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>

        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
