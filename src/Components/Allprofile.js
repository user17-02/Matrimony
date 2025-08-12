import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function AllProfiles() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [filters, setFilters] = useState({
    age: "",
    city: "",
    height: "",
    profession: "",
  });

  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Current User ID from localStorage:", currentUserId);
      if (!currentUserId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      try {
        // Fetch all users (excluding current user in backend logic)
        const resUsers = await axios.get(
          `http://localhost:5000/api/user/all/${currentUserId}`
        );
        console.log("Fetched Users from API:", resUsers.data);

        // Show all users as returned from API (no filtering)
        setUsers(resUsers.data);
        setFilteredUsers(resUsers.data);

        // Fetch interests
        const resInterests = await axios.get("http://localhost:5000/api/requests");
        const mine = resInterests.data.filter(
          (r) =>
            r.interestFrom === currentUserId || r.interestTo === currentUserId
        );
        console.log("Fetched Interests:", mine);
        setInterests(mine);

        // Fetch liked profiles
        const resLikeIds = await axios.get(
          `http://localhost:5000/api/likes/ids/${currentUserId}`
        );
        console.log("Fetched Likes:", resLikeIds.data);
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

    fetchData();
  }, [currentUserId]);

  // Apply filters
  useEffect(() => {
    let filtered = users;

    if (filters.age) {
      filtered = filtered.filter(user => user.age === parseInt(filters.age));
    }
    if (filters.city) {
      filtered = filtered.filter(user => user.city?.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.height) {
      filtered = filtered.filter(user => user.height === parseInt(filters.height));
    }
    if (filters.profession) {
      filtered = filtered.filter(user => user.profession?.toLowerCase().includes(filters.profession.toLowerCase()));
    }

    setFilteredUsers(filtered);
  }, [filters, users]);

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
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Registered Profiles</h3>

      {/* Filter UI */}
      <div className="card p-3 mb-4">
        <div className="row">
          <div className="col-md-2">
            <input
              type="number"
              name="age"
              className="form-control"
              placeholder="Age"
              value={filters.age}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="City"
              value={filters.city}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="height"
              className="form-control"
              placeholder="Height"
              value={filters.height}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="profession"
              className="form-control"
              placeholder="Profession"
              value={filters.profession}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Profiles */}
      <div className="row">
        {filteredUsers.length === 0 ? (
          <p>No profiles found.</p>
        ) : (
          filteredUsers.map((user) => {
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
                  <p>
                    <strong>Age:</strong> {user.age}
                  </p>
                  <p>
                    <strong>City:</strong> {user.city}
                  </p>
                  <p>
                    <strong>Height:</strong> {user.height}
                  </p>
                  <p>
                    <strong>Profession:</strong> {user.profession}
                  </p>

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
