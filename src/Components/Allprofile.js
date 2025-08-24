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
      if (!currentUserId) return;

      try {
        // Fetch current user first to check gender
        const resCurrentUser = await axios.get(`http://localhost:5000/api/user/${currentUserId}`);
        const currentUser = resCurrentUser.data;

        if (!currentUser.gender) {
          alert("Please update your gender in profile for better matching!");
        }

        // Fetch all other profiles (backend now filters by opposite gender automatically)
        const resUsers = await axios.get(`http://localhost:5000/api/user/all/${currentUserId}`);
        setUsers(resUsers.data);
        setFilteredUsers(resUsers.data);

        // Fetch interests
        const resInterests = await axios.get("http://localhost:5000/api/requests");
        const mine = resInterests.data.filter(
          (r) =>
            r.interestFrom?._id === currentUserId ||
            r.interestTo?._id === currentUserId ||
            r.interestFrom === currentUserId ||
            r.interestTo === currentUserId
        );
        setInterests(mine);

        // Fetch liked profiles
        const resLikeIds = await axios.get(`http://localhost:5000/api/likes/ids/${currentUserId}`);
        const likedIds = resLikeIds.data.likedIds || [];
        const map = {};
        likedIds.forEach((id) => (map[id] = true));
        setLikedMap(map);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [currentUserId]);

  useEffect(() => {
    let filtered = users;
    if (filters.age) filtered = filtered.filter((u) => u.age === parseInt(filters.age));
    if (filters.city)
      filtered = filtered.filter((u) => u.city?.toLowerCase().includes(filters.city.toLowerCase()));
    if (filters.height) filtered = filtered.filter((u) => u.height === parseInt(filters.height));
    if (filters.profession)
      filtered = filtered.filter((u) =>
        u.profession?.toLowerCase().includes(filters.profession.toLowerCase())
      );
    setFilteredUsers(filtered);
  }, [filters, users]);

  const handleSendInterest = async (receiverId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/requests", {
        interestFrom: currentUserId,
        interestTo: receiverId,
      });
      setInterests((prev) => [...prev, res.data]); // update instantly
    } catch (err) {
      console.error("Interest error:", err);
    }
  };

  const getInterestStatus = (userId) => {
    const entry = interests.find(
      (r) =>
        (r.interestFrom?._id?.toString() === currentUserId &&
          r.interestTo?._id?.toString() === userId) ||
        (r.interestTo?._id?.toString() === currentUserId &&
          r.interestFrom?._id?.toString() === userId) ||
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
      setLikedMap((prev) => ({ ...prev, [profileId]: res.data.liked }));
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Registered Profiles</h3>

      {/* Filters */}
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
                      }}
                    />
                  )}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <h5 className="mb-0">{user.name}</h5>
                    <div style={{ cursor: "pointer" }} onClick={() => handleLikeToggle(user._id)}>
                      {isLiked ? <FaHeart color="red" size={22} /> : <FaRegHeart color="gray" size={22} />}
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
                    <p style={{ color: "green", fontWeight: "bold" }}>Status: {status}</p>
                  )}

                  <button
                    className="btn btn-info mt-2 me-2"
                    onClick={() => navigate(`/view/${user._id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className={`btn mt-2 me-2 ${
                      status === "accepted"
                        ? "btn-success"
                        : status === "denied"
                        ? "btn-danger"
                        : status === "pending"
                        ? "btn-secondary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => handleSendInterest(user._id)}
                    disabled={status !== null}
                  >
                    {status === "pending"
                      ? "Interest Sent"
                      : status === "accepted"
                      ? "Interest Accepted"
                      : status === "denied"
                      ? "Interest Denied"
                      : "Send Interest"}
                  </button>

                  {status === "accepted" && (
                    <Link to={`/chat/${user._id}`}>
                      <button className="btn btn-success mt-2 w-100">Chat Now</button>
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
