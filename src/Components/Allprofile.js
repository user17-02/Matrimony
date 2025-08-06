import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function AllProfiles() {
  const [users, setUsers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [filters, setFilters] = useState({
    ageMin: '',
    ageMax: '',
    heightMin: '',
    heightMax: '',
    city: '',
    religion: '',
    caste: '',
    maritalStatus: '',
    job: '',
    education: ''
  });

  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
  }, [currentUserId]);

  const fetchData = async () => {
    if (!currentUserId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      const resUsers = await axios.get(
        `http://localhost:5000/api/user/all/${currentUserId}`,
        { headers: { "Cache-Control": "no-cache" } }
      );

      const filteredUsers = resUsers.data.filter(
        (user) => user.name && user.age && user.city && user.image
      );
      setUsers(filteredUsers);

      const resInterests = await axios.get("http://localhost:5000/api/requests");
      const mine = resInterests.data.filter(
        (r) =>
          r.interestFrom === currentUserId || r.interestTo === currentUserId
      );
      setInterests(mine);

      const resLikeIds = await axios.get(
        `http://localhost:5000/api/likes/ids/${currentUserId}`
      );
      const likedIds = resLikeIds.data.likedIds || [];
      const map = {};
      likedIds.forEach((id) => {
        map[id] = true;
      });
      setLikedMap(map);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSendInterest = async (receiverId) => {
    try {
      await axios.post("http://localhost:5000/api/requests", {
        interestFrom: currentUserId,
        interestTo: receiverId,
      });

      const res = await axios.get("http://localhost:5000/api/requests");
      const mine = res.data.filter(
        (r) =>
          r.interestFrom === currentUserId || r.interestTo === currentUserId
      );
      setInterests(mine);

      alert("Interest sent!");
    } catch (err) {
      console.error("Interest error:", err);
    }
  };

  const getInterestStatus = (userId) => {
    const entry = interests.find(
      (r) =>
        (r.interestFrom === currentUserId && r.interestTo === userId) ||
        (r.interestTo === currentUserId && r.interestFrom === userId)
    );
    return entry?.status || null;
  };

  const handleLikeToggle = async (profileId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/likes/toggle", {
        likedFrom: currentUserId,
        likedTo: profileId,
      });

      setLikedMap((prev) => ({
        ...prev,
        [profileId]: res.data.liked,
      }));
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/filter", filters);
      setUsers(res.data);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Registered Profiles</h3>

      <form className="row mb-4" onSubmit={applyFilters}>
        <div className="col">
          <input name="ageMin" placeholder="Min Age" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <input name="ageMax" placeholder="Max Age" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <input name="heightMin" placeholder="Min Height" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <input name="heightMax" placeholder="Max Height" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <input name="city" placeholder="City" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <input name="religion" placeholder="Religion" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <input name="caste" placeholder="Caste" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <input name="maritalStatus" placeholder="Marital Status" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <input name="job" placeholder="Profession" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <input name="education" placeholder="Education" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col">
          <button type="submit" className="btn btn-primary w-100">Apply Filters</button>
        </div>
      </form>

      <div className="row">
        {users.length === 0 ? (
          <p>No profiles found.</p>
        ) : (
          users.map((user) => {
            const status = getInterestStatus(user._id);
            const isLiked = likedMap[user._id];

            return (
              <div className="col-md-4 mb-4" key={user._id}>
                <div className="card p-3 shadow">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name}
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        display: "block",
                      }}
                    />
                  )}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <h5 className="mb-0">{user.name}</h5>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleLikeToggle(user._id)}
                    >
                      {isLiked ? (
                        <FaHeart color="red" size={22} />
                      ) : (
                        <FaRegHeart color="gray" size={22} />
                      )}
                    </div>
                  </div>
                  <p><strong>Age:</strong> {user.age}</p>
                  <p><strong>City:</strong> {user.city}</p>
                  <p><strong>Height:</strong> {user.height}</p>
                  <p><strong>Profession:</strong> {user.profession}</p>
                  <p><strong>Type:</strong> {user.type}</p>

                  {status && (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                    </p>
                  )}

                  <button
                    className="btn btn-info mt-2 me-2"
                    onClick={() => navigate(`/view/${user._id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="btn btn-outline-primary mt-2 me-2"
                    onClick={() => handleSendInterest(user._id)}
                    disabled={!!status}
                  >
                    {status
                      ? "Interest " +
                        status.charAt(0).toUpperCase() +
                        status.slice(1)
                      : "Send Interest"}
                  </button>

                  {status === "accepted" && (
                    <Link to={`/chat/${user._id}`}>
                      <button className="btn btn-success mt-2 w-100">
                        Chat Now
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AllProfiles;
