import React, { useEffect, useState } from "react";
import axios from "axios";
import Filters from "./Filters";

function Profilecard() {
  const [ProfilesData, setProfiles] = useState([]);
  const [filters, setFilters] = useState({
    religion: "",
    location: "",
    status: ""
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredProfiles = ProfilesData.filter((profile) => {
    return (
      (filters.religion === "" || profile.Religion === filters.religion) &&
      (filters.location === "" || profile.Location.toLowerCase() === filters.location.toLowerCase()) &&
      (filters.status === "" || profile.Status === filters.status)
    );
  });

  useEffect(() => {
    axios.get("/Data/Profiles.json")
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        {/* Filters Column */}
        <div className="col-md-4">
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Profiles Column */}
        <div className="col-md-8">
          <div className="row">
            {filteredProfiles.map((profile, index) => (
              <div className="col-12 mb-4" key={index}>
                <div className="card p-3 h-100 shadow-sm">
                  <div className="d-flex">
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="rounded"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover"
                      }}
                    />
                    <div className="ms-3">
                      <h5>{profile.name}</h5>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        <span className="badge bg-secondary">Degree: {profile.Degree}</span>
                        <span className="badge bg-secondary">Profession: {profile.Profession}</span>
                        <span className="badge bg-secondary">Age: {profile.age}</span>
                        <span className="badge bg-secondary">Height: {profile.height}</span>
                      </div>
                      <div>
                        <button className="btn btn-success btn-sm me-2">Chat Now</button>
                        <button className="btn btn-outline-primary btn-sm me-2">Whatsapp</button>
                        <button className="btn btn-outline-secondary btn-sm me-2">Send Interest</button>
                        <button className="btn btn-outline-dark btn-sm">More Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredProfiles.length === 0 && (
              <p className="text-muted">No profiles match your filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profilecard;
